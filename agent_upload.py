from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from datetime import datetime
import os

app = Flask(__name__)

# MongoDB connection
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

@app.route('/api/agent/upload', methods=['POST'])
def agent_upload_report():
    """Agent endpoint for uploading vulnerability reports"""
    try:
        # Check if file is present
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
        
        # Get additional parameters
        agent_id = request.form.get('agent_id', 'unknown')
        scan_type = request.form.get('scan_type', 'vulnerability')
        
        # Validate file type
        allowed_extensions = {'.pdf', '.csv', '.xlsx', '.nessus', '.xml'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            return jsonify({
                'success': False,
                'message': 'Invalid file type. Allowed: PDF, CSV, XLSX, Nessus, XML'
            }), 400
        
        # Secure filename
        filename = secure_filename(file.filename)
        
        # Create uploads directory if it doesn't exist
        os.makedirs('uploads', exist_ok=True)
        
        # Save file
        file_path = f"uploads/{filename}"
        file.save(file_path)
        
        # Get file size
        file_size = os.path.getsize(file_path)
        
        # Determine file type
        file_type_map = {
            '.pdf': 'pdf',
            '.csv': 'csv',
            '.xlsx': 'excel',
            '.nessus': 'nessus_xml',
            '.xml': 'xml'
        }
        file_type = file_type_map.get(file_ext, 'unknown')
        
        # Create report document in reports collection
        report_doc = {
            'filename': filename,
            'file_type': file_type,
            'upload_timestamp': datetime.utcnow(),
            'file_size': file_size,
            'status': 'completed',  # Simplified for demo
            'agent_id': agent_id,
            'scan_type': scan_type,
            'total_vulnerabilities': 1,  # Mock data
            'vulnerability_ids': []
        }
        
        # Insert report
        report_result = db.reports.insert_one(report_doc)
        report_id = report_result.inserted_id
        
        # Create mock vulnerability document (in production, this would be from actual file processing)
        vulnerability_doc = {
            'filename': filename,
            'file_type': file_type,
            'upload_timestamp': datetime.utcnow(),
            'processing_result': {
                'vulnerabilities': [
                    {
                        'vul_name': 'Sample Vulnerability',
                        'description': 'This is a sample vulnerability from agent upload',
                        'criticality': 'Medium',
                        'affected_hosts': ['192.168.1.100'],
                        'cve_id': 'CVE-2024-SAMPLE',
                        'impact': 'Potential security risk',
                        'verification_status': False,
                        'plugin_id': '12345',
                        'port': '443',
                        'os': 'Linux',
                        'plugin_family': 'General',
                        'cvss_base_score': '5.0',
                        'cvss_vector': 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                        'protocol': 'tcp',
                        'priority_level': 'Medium',
                        'category': 'configuration_management',
                        'mitigation_steps': 'Please review and update system configuration'
                    }
                ]
            },
            'grouping_analysis': {},
            'processing_timestamp': datetime.utcnow().isoformat(),
            'total_vulnerabilities': 1,
            'file_type_detected': file_type,
            'file_size': file_size
        }
        
        # Insert vulnerability
        vuln_result = db.vulnerabilities.insert_one(vulnerability_doc)
        vuln_id = vuln_result.inserted_id
        
        # Update report with vulnerability ID
        db.reports.update_one(
            {'_id': report_id},
            {'$push': {'vulnerability_ids': vuln_id}}
        )
        
        return jsonify({
            'success': True,
            'data': {
                'report_id': str(report_id),
                'vulnerability_id': str(vuln_id),
                'filename': filename,
                'file_type': file_type,
                'file_size': file_size,
                'status': 'completed',
                'vulnerabilities_found': 1,
                'message': 'File uploaded and processed successfully'
            }
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error uploading file: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)