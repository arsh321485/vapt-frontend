from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

assets_bp = Blueprint('assets', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

from app import serialize_doc, validate_object_id, require_role, paginate_results

@assets_bp.route('', methods=['GET'])
@require_role(['admin', 'user'])
def get_all_assets():
    """Get all assets based on affected hosts from vulnerabilities"""
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        
        # Aggregate unique affected hosts from vulnerabilities
        pipeline = [
            {'$unwind': '$processing_result.vulnerabilities'},
            {'$unwind': '$processing_result.vulnerabilities.affected_hosts'},
            {
                '$group': {
                    '_id': '$processing_result.vulnerabilities.affected_hosts',
                    'os': {'$first': '$processing_result.vulnerabilities.os'},
                    'vulnerability_count': {'$sum': 1},
                    'last_seen': {'$max': '$upload_timestamp'},
                    'criticalities': {'$addToSet': '$processing_result.vulnerabilities.criticality'}
                }
            },
            {'$sort': {'last_seen': -1}},
            {'$skip': (page - 1) * limit},
            {'$limit': limit}
        ]
        
        assets = list(db.vulnerabilities.aggregate(pipeline))
        
        # Format response
        formatted_assets = []
        for asset in assets:
            formatted_assets.append({
                'host': asset['_id'],
                'os': asset.get('os', 'Unknown'),
                'vulnerability_count': asset['vulnerability_count'],
                'last_seen': asset['last_seen'],
                'risk_level': 'High' if 'Critical' in asset['criticalities'] else 'Medium'
            })
        
        return jsonify({
            'success': True,
            'data': {
                'assets': formatted_assets,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': len(formatted_assets),
                    'total_pages': 1
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching assets: {str(e)}'
        }), 500

@assets_bp.route('/<host>/vulnerabilities', methods=['GET'])
@require_role(['admin', 'user'])
def get_asset_vulnerabilities(host):
    """Get vulnerabilities for specific host"""
    try:
        pipeline = [
            {'$unwind': '$processing_result.vulnerabilities'},
            {
                '$match': {
                    'processing_result.vulnerabilities.affected_hosts': host
                }
            },
            {
                '$project': {
                    'vulnerability': '$processing_result.vulnerabilities',
                    'filename': '$filename',
                    'upload_timestamp': '$upload_timestamp'
                }
            }
        ]
        
        vulnerabilities = list(db.vulnerabilities.aggregate(pipeline))
        
        return jsonify({
            'success': True,
            'data': {
                'host': host,
                'vulnerabilities': serialize_doc(vulnerabilities)
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching asset vulnerabilities: {str(e)}'
        }), 500