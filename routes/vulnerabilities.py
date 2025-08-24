from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import math

vulnerabilities_bp = Blueprint('vulnerabilities', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

from app import serialize_doc, validate_object_id, require_role

@vulnerabilities_bp.route('', methods=['GET'])
@require_role(['admin', 'user'])
def get_all_vulnerabilities():
    """Get all vulnerabilities with advanced filtering based on actual MongoDB structure"""
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        criticality = request.args.get('criticality')
        category = request.args.get('category')
        file_type = request.args.get('file_type')
        verification_status = request.args.get('verification_status')
        search = request.args.get('search')
        affected_host = request.args.get('affected_host')
        
        # Build aggregation pipeline to work with nested vulnerability data
        pipeline = []
        
        # Match stage for document-level filters
        match_stage = {}
        if file_type:
            match_stage['file_type'] = file_type
        if search:
            match_stage['$or'] = [
                {'filename': {'$regex': search, '$options': 'i'}},
                {'processing_result.vulnerabilities.vul_name': {'$regex': search, '$options': 'i'}},
                {'processing_result.vulnerabilities.cve_id': {'$regex': search, '$options': 'i'}}
            ]
        
        if match_stage:
            pipeline.append({'$match': match_stage})
        
        # Unwind vulnerabilities array
        pipeline.append({'$unwind': '$processing_result.vulnerabilities'})
        
        # Match stage for vulnerability-specific filters
        vuln_match = {}
        if criticality:
            vuln_match['processing_result.vulnerabilities.criticality'] = criticality
        if category:
            vuln_match['processing_result.vulnerabilities.category'] = category
        if verification_status is not None:
            vuln_match['processing_result.vulnerabilities.verification_status'] = verification_status.lower() == 'true'
        if affected_host:
            vuln_match['processing_result.vulnerabilities.affected_hosts'] = affected_host
        
        if vuln_match:
            pipeline.append({'$match': vuln_match})
        
        # Add metadata and project final structure
        pipeline.append({
            '$project': {
                'vulnerability_id': '$_id',
                'report_filename': '$filename',
                'file_type': '$file_type',
                'upload_timestamp': '$upload_timestamp',
                'vulnerability': '$processing_result.vulnerabilities',
                'processing_timestamp': '$processing_timestamp'
            }
        })
        
        # Sort by upload timestamp
        pipeline.append({'$sort': {'upload_timestamp': -1}})
        
        # Get total count
        count_pipeline = pipeline.copy()
        count_pipeline.append({'$count': 'total'})
        count_result = list(db.vulnerabilities.aggregate(count_pipeline))
        total = count_result[0]['total'] if count_result else 0
        
        # Add pagination
        skip = (page - 1) * limit
        pipeline.extend([
            {'$skip': skip},
            {'$limit': limit}
        ])
        
        vulnerabilities = list(db.vulnerabilities.aggregate(pipeline))
        total_pages = math.ceil(total / limit)
        
        # Format response
        formatted_vulns = []
        for vuln_doc in vulnerabilities:
            vuln = vuln_doc['vulnerability']
            formatted_vulns.append({
                'vulnerability_id': str(vuln_doc['vulnerability_id']),
                'report_filename': vuln_doc['report_filename'],
                'file_type': vuln_doc['file_type'],
                'upload_timestamp': vuln_doc['upload_timestamp'],
                'vul_name': vuln.get('vul_name', ''),
                'description': vuln.get('description', ''),
                'criticality': vuln.get('criticality', ''),
                'affected_hosts': vuln.get('affected_hosts', []),
                'cve_id': vuln.get('cve_id', ''),
                'impact': vuln.get('impact', ''),
                'verification_status': vuln.get('verification_status', False),
                'plugin_id': vuln.get('plugin_id', ''),
                'port': vuln.get('port', ''),
                'os': vuln.get('os', ''),
                'cvss_base_score': vuln.get('cvss_base_score', ''),
                'priority_level': vuln.get('priority_level', ''),
                'category': vuln.get('category', ''),
                'mitigation_steps': vuln.get('mitigation_steps', '')
            })
        
        return jsonify({
            'success': True,
            'data': {
                'vulnerabilities': formatted_vulns,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'total_pages': total_pages
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching vulnerabilities: {str(e)}'
        }), 500

@vulnerabilities_bp.route('/<vuln_id>', methods=['GET'])
@require_role(['admin', 'user'])
def get_vulnerability_details(vuln_id):
    """Get detailed vulnerability information"""
    try:
        if not validate_object_id(vuln_id):
            return jsonify({
                'success': False,
                'message': 'Invalid vulnerability ID'
            }), 400
        
        vuln_doc = db.vulnerabilities.find_one({'_id': ObjectId(vuln_id)})
        
        if not vuln_doc:
            return jsonify({
                'success': False,
                'message': 'Vulnerability not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': serialize_doc(vuln_doc)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching vulnerability: {str(e)}'
        }), 500

@vulnerabilities_bp.route('/<vuln_id>', methods=['PUT'])
@require_role(['admin'])
def update_vulnerability(vuln_id):
    """Update vulnerability details"""
    try:
        if not validate_object_id(vuln_id):
            return jsonify({
                'success': False,
                'message': 'Invalid vulnerability ID'
            }), 400
        
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Build update query for nested vulnerability fields
        update_fields = {}
        
        # Fields that can be updated within vulnerabilities array
        vuln_updates = {}
        if 'criticality' in data:
            vuln_updates['processing_result.vulnerabilities.$.criticality'] = data['criticality']
        if 'verification_status' in data:
            vuln_updates['processing_result.vulnerabilities.$.verification_status'] = data['verification_status']
        if 'mitigation_steps' in data:
            vuln_updates['processing_result.vulnerabilities.$.mitigation_steps'] = data['mitigation_steps']
        if 'priority_level' in data:
            vuln_updates['processing_result.vulnerabilities.$.priority_level'] = data['priority_level']
        if 'category' in data:
            vuln_updates['processing_result.vulnerabilities.$.category'] = data['category']
        
        if vuln_updates:
            update_fields.update(vuln_updates)
            update_fields['updated_at'] = datetime.utcnow()
        
        if not update_fields:
            return jsonify({
                'success': False,
                'message': 'No valid fields to update'
            }), 400
        
        # Update the vulnerability document
        result = db.vulnerabilities.update_one(
            {'_id': ObjectId(vuln_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'Vulnerability not found or no changes made'
            }), 404
        
        # Get updated vulnerability
        updated_vuln = db.vulnerabilities.find_one({'_id': ObjectId(vuln_id)})
        
        return jsonify({
            'success': True,
            'message': 'Vulnerability updated successfully',
            'data': serialize_doc(updated_vuln)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating vulnerability: {str(e)}'
        }), 500

@vulnerabilities_bp.route('/<vuln_id>/assign', methods=['POST'])
@require_role(['admin'])
def assign_vulnerability(vuln_id):
    """Assign vulnerability to a user"""
    try:
        if not validate_object_id(vuln_id):
            return jsonify({
                'success': False,
                'message': 'Invalid vulnerability ID'
            }), 400
        
        data = request.get_json()
        if not data or 'assigned_to' not in data:
            return jsonify({
                'success': False,
                'message': 'assigned_to user ID is required'
            }), 400
        
        assigned_to = data['assigned_to']
        if not validate_object_id(assigned_to):
            return jsonify({
                'success': False,
                'message': 'Invalid assigned_to user ID'
            }), 400
        
        # Check if user exists
        user = db.users.find_one({'_id': ObjectId(assigned_to)})
        if not user:
            return jsonify({
                'success': False,
                'message': 'Assigned user not found'
            }), 404
        
        # Update vulnerability assignment
        result = db.vulnerabilities.update_one(
            {'_id': ObjectId(vuln_id)},
            {
                '$set': {
                    'assigned_to': ObjectId(assigned_to),
                    'assigned_at': datetime.utcnow(),
                    'assigned_by': ObjectId(get_jwt_identity()),
                    'status': 'assigned',
                    'updated_at': datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'Vulnerability not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': f'Vulnerability assigned to {user["profile"]["first_name"]} {user["profile"]["last_name"]}'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error assigning vulnerability: {str(e)}'
        }), 500

@vulnerabilities_bp.route('/<vuln_id>/status', methods=['PUT'])
@require_role(['admin', 'user'])
def update_vulnerability_status(vuln_id):
    """Update vulnerability status"""
    try:
        if not validate_object_id(vuln_id):
            return jsonify({
                'success': False,
                'message': 'Invalid vulnerability ID'
            }), 400
        
        data = request.get_json()
        if not data or 'status' not in data:
            return jsonify({
                'success': False,
                'message': 'Status is required'
            }), 400
        
        status = data['status']
        valid_statuses = ['open', 'assigned', 'in_progress', 'fixed', 'verified', 'closed']
        
        if status not in valid_statuses:
            return jsonify({
                'success': False,
                'message': f'Status must be one of: {", ".join(valid_statuses)}'
            }), 400
        
        update_fields = {
            'status': status,
            'status_updated_at': datetime.utcnow(),
            'status_updated_by': ObjectId(get_jwt_identity()),
            'updated_at': datetime.utcnow()
        }
        
        # Add status-specific fields
        if status == 'fixed':
            update_fields['fixed_at'] = datetime.utcnow()
        elif status == 'verified':
            update_fields['verified_at'] = datetime.utcnow()
        elif status == 'closed':
            update_fields['closed_at'] = datetime.utcnow()
        
        result = db.vulnerabilities.update_one(
            {'_id': ObjectId(vuln_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'Vulnerability not found'
            }), 404
        
        return jsonify({
            'success': True,
            'message': f'Vulnerability status updated to {status}'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating status: {str(e)}'
        }), 500

@vulnerabilities_bp.route('/<vuln_id>/history', methods=['GET'])
@require_role(['admin', 'user'])
def get_vulnerability_history(vuln_id):
    """Get vulnerability change history"""
    try:
        if not validate_object_id(vuln_id):
            return jsonify({
                'success': False,
                'message': 'Invalid vulnerability ID'
            }), 400
        
        # Get vulnerability with history (this would require a separate history collection in production)
        vuln = db.vulnerabilities.find_one({'_id': ObjectId(vuln_id)})
        
        if not vuln:
            return jsonify({
                'success': False,
                'message': 'Vulnerability not found'
            }), 404
        
        # Mock history data - in production, you'd have a separate audit log collection
        history = [
            {
                'action': 'created',
                'timestamp': vuln.get('upload_timestamp'),
                'user': 'System',
                'details': 'Vulnerability discovered from report upload'
            }
        ]
        
        if 'assigned_to' in vuln:
            assigned_user = db.users.find_one({'_id': vuln['assigned_to']})
            history.append({
                'action': 'assigned',
                'timestamp': vuln.get('assigned_at'),
                'user': f"{assigned_user['profile']['first_name']} {assigned_user['profile']['last_name']}" if assigned_user else 'Unknown',
                'details': 'Vulnerability assigned for remediation'
            })
        
        return jsonify({
            'success': True,
            'data': {
                'vulnerability_id': vuln_id,
                'history': history
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching history: {str(e)}'
        }), 500