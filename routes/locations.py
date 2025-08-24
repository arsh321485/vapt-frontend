from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

locations_bp = Blueprint('locations', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

from app import serialize_doc, validate_object_id, require_role, paginate_results

@locations_bp.route('', methods=['GET'])
@require_role(['admin', 'user'])
def get_all_locations():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        search = request.args.get('search')
        is_active = request.args.get('is_active')
        
        query = {}
        if search:
            query['$or'] = [
                {'name': {'$regex': search, '$options': 'i'}},
                {'address.country': {'$regex': search, '$options': 'i'}},
                {'address.city': {'$regex': search, '$options': 'i'}}
            ]
        
        if is_active is not None:
            query['is_active'] = is_active.lower() == 'true'
        
        result = paginate_results(db.locations, query, page, limit)
        
        return jsonify({
            'success': True,
            'data': {
                'locations': result['data'],
                'pagination': result['pagination']
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching locations: {str(e)}'
        }), 500

@locations_bp.route('', methods=['POST'])
@require_role(['admin'])
def create_location():
    try:
        data = request.get_json()
        
        if not data or 'name' not in data:
            return jsonify({
                'success': False,
                'message': 'Location name is required'
            }), 400
        
        # Check if location already exists
        existing = db.locations.find_one({'name': data['name'].strip()})
        if existing:
            return jsonify({
                'success': False,
                'message': 'Location already exists'
            }), 409
        
        location_doc = {
            'name': data['name'].strip(),
            'description': data.get('description', '').strip(),
            'address': {
                'country': data.get('address', {}).get('country', '').strip(),
                'city': data.get('address', {}).get('city', '').strip(),
                'address': data.get('address', {}).get('address', '').strip()
            },
            'is_active': data.get('is_active', True),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        result = db.locations.insert_one(location_doc)
        created_location = db.locations.find_one({'_id': result.inserted_id})
        
        return jsonify({
            'success': True,
            'message': 'Location created successfully',
            'data': serialize_doc(created_location)
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error creating location: {str(e)}'
        }), 500

@locations_bp.route('/<location_id>', methods=['GET'])
@require_role(['admin', 'user'])
def get_location(location_id):
    try:
        if not validate_object_id(location_id):
            return jsonify({
                'success': False,
                'message': 'Invalid location ID'
            }), 400
        
        location = db.locations.find_one({'_id': ObjectId(location_id)})
        
        if not location:
            return jsonify({
                'success': False,
                'message': 'Location not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': serialize_doc(location)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching location: {str(e)}'
        }), 500

@locations_bp.route('/<location_id>', methods=['PUT'])
@require_role(['admin'])
def update_location(location_id):
    try:
        if not validate_object_id(location_id):
            return jsonify({
                'success': False,
                'message': 'Invalid location ID'
            }), 400
        
        data = request.get_json()
        
        update_fields = {}
        if 'name' in data:
            # Check if new name conflicts with existing location
            existing = db.locations.find_one({
                'name': data['name'].strip(),
                '_id': {'$ne': ObjectId(location_id)}
            })
            if existing:
                return jsonify({
                    'success': False,
                    'message': 'Location name already exists'
                }), 409
            update_fields['name'] = data['name'].strip()
        
        if 'description' in data:
            update_fields['description'] = data['description'].strip()
        
        if 'address' in data:
            address = data['address']
            if 'country' in address:
                update_fields['address.country'] = address['country'].strip()
            if 'city' in address:
                update_fields['address.city'] = address['city'].strip()
            if 'address' in address:
                update_fields['address.address'] = address['address'].strip()
        
        if 'is_active' in data:
            update_fields['is_active'] = data['is_active']
        
        if not update_fields:
            return jsonify({
                'success': False,
                'message': 'No valid fields to update'
            }), 400
        
        update_fields['updated_at'] = datetime.utcnow()
        
        result = db.locations.update_one(
            {'_id': ObjectId(location_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'Location not found or no changes made'
            }), 404
        
        updated_location = db.locations.find_one({'_id': ObjectId(location_id)})
        
        return jsonify({
            'success': True,
            'message': 'Location updated successfully',
            'data': serialize_doc(updated_location)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating location: {str(e)}'
        }), 500

@locations_bp.route('/<location_id>', methods=['DELETE'])
@require_role(['admin'])
def delete_location(location_id):
    try:
        if not validate_object_id(location_id):
            return jsonify({
                'success': False,
                'message': 'Invalid location ID'
            }), 400
        
        # Check if location has associated assets or vulnerabilities
        asset_count = db.assets.count_documents({'location': ObjectId(location_id)})
        if asset_count > 0:
            return jsonify({
                'success': False,
                'message': f'Cannot delete location with {asset_count} associated assets'
            }), 400
        
        result = db.locations.delete_one({'_id': ObjectId(location_id)})
        
        if result.deleted_count == 1:
            return jsonify({
                'success': True,
                'message': 'Location deleted successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Location not found'
            }), 404
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error deleting location: {str(e)}'
        }), 500

@locations_bp.route('/<location_id>/assets', methods=['GET'])
@require_role(['admin', 'user'])
def get_location_assets(location_id):
    try:
        if not validate_object_id(location_id):
            return jsonify({
                'success': False,
                'message': 'Invalid location ID'
            }), 400
        
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        
        query = {'location': ObjectId(location_id)}
        result = paginate_results(db.assets, query, page, limit)
        
        return jsonify({
            'success': True,
            'data': {
                'location_id': location_id,
                'assets': result['data'],
                'pagination': result['pagination']
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching location assets: {str(e)}'
        }), 500