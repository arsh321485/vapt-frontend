from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
from werkzeug.utils import secure_filename
import os

reports_bp = Blueprint('reports', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

from app import serialize_doc, validate_object_id, require_role, paginate_results

@reports_bp.route('', methods=['GET'])
@require_role(['admin'])
def get_all_reports():
    """Get all reports with filters"""
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        file_type = request.args.get('file_type')
        status = request.args.get('status')
        search = request.args.get('search')
        
        query = {}
        if file_type:
            query['file_type'] = file_type
        if status:
            query['status'] = status
        if search:
            query['filename'] = {'$regex': search, '$options': 'i'}
        
        result = paginate_results(db.reports, query, page, limit, 'upload_timestamp', -1)
        
        return jsonify({
            'success': True,
            'data': {
                'reports': result['data'],
                'pagination': result['pagination']
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching reports: {str(e)}'
        }), 500

@reports_bp.route('/<report_id>', methods=['GET'])
@require_role(['admin'])
def get_report_details(report_id):
    """Get report details with associated vulnerabilities"""
    try:
        if not validate_object_id(report_id):
            return jsonify({
                'success': False,
                'message': 'Invalid report ID'
            }), 400
        
        report = db.reports.find_one({'_id': ObjectId(report_id)})
        
        if not report:
            return jsonify({
                'success': False,
                'message': 'Report not found'
            }), 404
        
        # Get associated vulnerabilities
        if 'vulnerability_ids' in report:
            vuln_ids = report['vulnerability_ids']
            vulnerabilities = list(db.vulnerabilities.find({'_id': {'$in': vuln_ids}}))
            report['vulnerabilities'] = serialize_doc(vulnerabilities)
        
        return jsonify({
            'success': True,
            'data': serialize_doc(report)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching report: {str(e)}'
        }), 500

@reports_bp.route('/<report_id>', methods=['DELETE'])
@require_role(['admin'])
def delete_report(report_id):
    """Delete report and associated vulnerabilities"""
    try:
        if not validate_object_id(report_id):
            return jsonify({
                'success': False,
                'message': 'Invalid report ID'
            }), 400
        
        report = db.reports.find_one({'_id': ObjectId(report_id)})
        if not report:
            return jsonify({
                'success': False,
                'message': 'Report not found'
            }), 404
        
        # Delete associated vulnerabilities
        if 'vulnerability_ids' in report:
            db.vulnerabilities.delete_many({'_id': {'$in': report['vulnerability_ids']}})
        
        # Delete report
        db.reports.delete_one({'_id': ObjectId(report_id)})
        
        return jsonify({
            'success': True,
            'message': 'Report and associated vulnerabilities deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error deleting report: {str(e)}'
        }), 500

@reports_bp.route('/upload', methods=['POST'])
@require_role(['admin'])
def upload_report():
    """Upload vulnerability report"""
    try:
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No file provided'
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                'success': False,
                'message': 'No file selected'
            }), 400
        
        # Validate file type
        allowed_extensions = {'.pdf', '.csv', '.xlsx', '.nessus', '.xml'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            return jsonify({
                'success': False,
                'message': 'Invalid file type'
            }), 400
        
        filename = secure_filename(file.filename)
        file_path = os.path.join('uploads', filename)
        file.save(file_path)
        
        # Create report document
        report_doc = {
            'filename': filename,
            'file_type': file_ext[1:],  # Remove dot
            'upload_timestamp': datetime.utcnow(),
            'file_size': os.path.getsize(file_path),
            'status': 'processing',
            'total_vulnerabilities': 0,
            'vulnerability_ids': []
        }
        
        result = db.reports.insert_one(report_doc)
        
        return jsonify({
            'success': True,
            'message': 'Report uploaded successfully',
            'data': {
                'report_id': str(result.inserted_id),
                'filename': filename,
                'status': 'processing'
            }
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error uploading report: {str(e)}'
        }), 500