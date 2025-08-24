from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from app import serialize_doc, require_role

analytics_bp = Blueprint('analytics', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

@analytics_bp.route('/dashboard', methods=['GET'])
@require_role(['admin'])
def get_dashboard_stats():
    """Get comprehensive dashboard statistics"""
    try:
        # Get total reports
        total_reports = db.reports.count_documents({})
        
        # Get total vulnerabilities across all reports
        total_vulns_pipeline = [
            {'$group': {'_id': None, 'total': {'$sum': '$total_vulnerabilities'}}}
        ]
        total_vulns_result = list(db.reports.aggregate(total_vulns_pipeline))
        total_vulnerabilities = total_vulns_result[0]['total'] if total_vulns_result else 0
        
        # Get vulnerabilities by criticality
        criticality_pipeline = [
            {'$unwind': '$processing_result.vulnerabilities'},
            {
                '$group': {
                    '_id': '$processing_result.vulnerabilities.criticality',
                    'count': {'$sum': 1}
                }
            }
        ]
        criticality_stats = list(db.vulnerabilities.aggregate(criticality_pipeline))
        criticality_dict = {item['_id']: item['count'] for item in criticality_stats}
        
        # Get unique affected hosts
        hosts_pipeline = [
            {'$unwind': '$processing_result.vulnerabilities'},
            {'$unwind': '$processing_result.vulnerabilities.affected_hosts'},
            {'$group': {'_id': '$processing_result.vulnerabilities.affected_hosts'}},
            {'$count': 'total'}
        ]
        hosts_result = list(db.vulnerabilities.aggregate(hosts_pipeline))
        total_hosts = hosts_result[0]['total'] if hosts_result else 0
        
        # Get recent reports
        recent_reports = list(db.reports.find({})
                            .sort('upload_timestamp', -1)
                            .limit(5)
                            .projection({'filename': 1, 'upload_timestamp': 1, 'total_vulnerabilities': 1, 'status': 1}))
        
        # Get file type distribution
        file_type_pipeline = [
            {
                '$group': {
                    '_id': '$file_type',
                    'count': {'$sum': 1}
                }
            }
        ]
        file_type_stats = list(db.reports.aggregate(file_type_pipeline))
        
        return jsonify({
            'success': True,
            'data': {
                'total_reports': total_reports,
                'total_vulnerabilities': total_vulnerabilities,
                'total_affected_hosts': total_hosts,
                'vulnerabilities_by_criticality': {
                    'critical': criticality_dict.get('Critical', 0),
                    'high': criticality_dict.get('High', 0),
                    'medium': criticality_dict.get('Medium', 0),
                    'low': criticality_dict.get('Low', 0)
                },
                'file_type_distribution': {item['_id']: item['count'] for item in file_type_stats},
                'recent_reports': serialize_doc(recent_reports)
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching dashboard stats: {str(e)}'
        }), 500

@analytics_bp.route('/vulnerabilities', methods=['GET'])
@require_role(['admin'])
def get_vulnerability_analytics():
    """Get detailed vulnerability analytics"""
    try:
        # Vulnerability trends over time
        trends_pipeline = [
            {
                '$group': {
                    '_id': {
                        'year': {'$year': '$upload_timestamp'},
                        'month': {'$month': '$upload_timestamp'}
                    },
                    'vulnerabilities': {'$sum': '$total_vulnerabilities'}
                }
            },
            {'$sort': {'_id.year': 1, '_id.month': 1}}
        ]
        
        trends = list(db.reports.aggregate(trends_pipeline))
        
        # Top affected hosts
        top_hosts_pipeline = [
            {'$unwind': '$processing_result.vulnerabilities'},
            {'$unwind': '$processing_result.vulnerabilities.affected_hosts'},
            {
                '$group': {
                    '_id': '$processing_result.vulnerabilities.affected_hosts',
                    'count': {'$sum': 1},
                    'critical_count': {
                        '$sum': {
                            '$cond': [
                                {'$eq': ['$processing_result.vulnerabilities.criticality', 'Critical']},
                                1, 0
                            ]
                        }
                    }
                }
            },
            {'$sort': {'count': -1}},
            {'$limit': 10}
        ]
        
        top_hosts = list(db.vulnerabilities.aggregate(top_hosts_pipeline))
        
        return jsonify({
            'success': True,
            'data': {
                'trends': serialize_doc(trends),
                'top_affected_hosts': serialize_doc(top_hosts)
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching vulnerability analytics: {str(e)}'
        }), 500

@analytics_bp.route('/performance', methods=['GET'])
@require_role(['admin'])
def get_performance_metrics():
    """Get system performance metrics"""
    try:
        # Processing time metrics
        processing_pipeline = [
            {
                '$project': {
                    'filename': 1,
                    'status': 1,
                    'total_vulnerabilities': 1,
                    'upload_timestamp': 1,
                    'processing_timestamp': 1
                }
            }
        ]
        
        processing_data = list(db.reports.aggregate(processing_pipeline))
        
        return jsonify({
            'success': True,
            'data': {
                'total_processed': len(processing_data),
                'avg_vulnerabilities_per_report': sum(r.get('total_vulnerabilities', 0) for r in processing_data) / len(processing_data) if processing_data else 0,
                'processing_status_distribution': {
                    'completed': len([r for r in processing_data if r.get('status') == 'completed']),
                    'processing': len([r for r in processing_data if r.get('status') == 'processing']),
                    'failed': len([r for r in processing_data if r.get('status') == 'failed'])
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching performance metrics: {str(e)}'
        }), 500

@analytics_bp.route('/compliance', methods=['GET'])
@require_role(['admin'])
def get_compliance_reporting():
    """Get compliance metrics"""
    try:
        # Basic compliance metrics based on vulnerabilities
        compliance_pipeline = [
            {'$unwind': '$processing_result.vulnerabilities'},
            {
                '$group': {
                    '_id': '$processing_result.vulnerabilities.verification_status',
                    'count': {'$sum': 1}
                }
            }
        ]
        
        compliance_data = list(db.vulnerabilities.aggregate(compliance_pipeline))
        
        return jsonify({
            'success': True,
            'data': {
                'verification_status': {
                    'verified': next((item['count'] for item in compliance_data if item['_id'] == True), 0),
                    'unverified': next((item['count'] for item in compliance_data if item['_id'] == False), 0)
                },
                'compliance_score': 85  # Mock compliance score
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching compliance data: {str(e)}'
        }), 500
