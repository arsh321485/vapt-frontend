from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
import os
import math
import hashlib
import secrets
from functools import wraps
import json

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size

# Initialize extensions
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)

# MongoDB connection
mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
mongo_client = MongoClient(mongo_uri)
db = mongo_client.vulnerability_db

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Blacklisted tokens storage (in production, use Redis)
blacklisted_tokens = set()

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    return jwt_payload['jti'] in blacklisted_tokens

# Helper functions
def serialize_doc(doc):
    """Convert MongoDB document to JSON serializable format"""
    if doc is None:
        return None
    
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    
    if isinstance(doc, dict):
        result = {}
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                result[key] = str(value)
            elif isinstance(value, datetime):
                result[key] = value.isoformat()
            elif isinstance(value, (dict, list)):
                result[key] = serialize_doc(value)
            else:
                result[key] = value
        return result
    
    return doc

def validate_object_id(id_string):
    """Validate if string is a valid ObjectId"""
    try:
        ObjectId(id_string)
        return True
    except:
        return False

def require_role(allowed_roles):
    """Decorator to check user role"""
    def decorator(f):
        @wraps(f)
        @jwt_required()
        def decorated_function(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = db.users.find_one({'_id': ObjectId(current_user_id)})
            
            if not user or user.get('role') not in allowed_roles:
                return jsonify({
                    'success': False,
                    'message': 'Insufficient permissions'
                }), 403
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def paginate_results(collection, query, page, limit, sort_field='_id', sort_order=-1):
    """Helper function for pagination"""
    total = collection.count_documents(query)
    total_pages = math.ceil(total / limit)
    skip = (page - 1) * limit
    
    cursor = collection.find(query).sort(sort_field, sort_order).skip(skip).limit(limit)
    results = list(cursor)
    
    return {
        'data': serialize_doc(results),
        'pagination': {
            'page': page,
            'limit': limit,
            'total': total,
            'total_pages': total_pages
        }
    }

# Import route modules
from routes.auth import auth_bp
from routes.users import users_bp
from routes.locations import locations_bp
from routes.assets import assets_bp
from routes.vulnerabilities import vulnerabilities_bp
from routes.reports import reports_bp
from routes.mitigation_strategies import mitigation_bp
from routes.fixes import fixes_bp
from routes.exceptions import exceptions_bp
from routes.teams import teams_bp
from routes.analytics import analytics_bp
from routes.risk import risk_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(users_bp, url_prefix='/api/admin/users')
app.register_blueprint(locations_bp, url_prefix='/api/admin/locations')
app.register_blueprint(assets_bp, url_prefix='/api/admin/assets')
app.register_blueprint(vulnerabilities_bp, url_prefix='/api/admin/vulnerabilities')
app.register_blueprint(reports_bp, url_prefix='/api/admin/reports')
app.register_blueprint(mitigation_bp, url_prefix='/api/admin/mitigation-strategies')
app.register_blueprint(fixes_bp, url_prefix='/api/admin/fixes')
app.register_blueprint(exceptions_bp, url_prefix='/api/admin/exceptions')
app.register_blueprint(teams_bp, url_prefix='/api/admin/teams')
app.register_blueprint(analytics_bp, url_prefix='/api/admin/analytics')
app.register_blueprint(risk_bp, url_prefix='/api/admin/risk')

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        'success': False,
        'message': 'Bad request',
        'error': str(error)
    }), 400

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({
        'success': False,
        'message': 'Unauthorized'
    }), 401

@app.errorhandler(403)
def forbidden(error):
    return jsonify({
        'success': False,
        'message': 'Forbidden'
    }), 403

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Resource not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)