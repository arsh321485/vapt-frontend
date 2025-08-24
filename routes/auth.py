from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import re

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# Get database connection
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

# Import blacklisted_tokens from main app (in production, use Redis)
from app import blacklisted_tokens, serialize_doc

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validate password strength"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r'[0-9]', password):
        return False, "Password must contain at least one digit"
    return True, "Password is valid"

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        email = data.get('email', '').lower().strip()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                'success': False,
                'message': 'Email and password are required'
            }), 400
        
        # Find user by email
        user = db.users.find_one({'email': email})
        
        if not user:
            return jsonify({
                'success': False,
                'message': 'Invalid credentials'
            }), 401
        
        # Check if user is active
        if not user.get('is_active', True):
            return jsonify({
                'success': False,
                'message': 'Account is deactivated'
            }), 401
        
        # Verify password
        if not bcrypt.check_password_hash(user['password'], password):
            return jsonify({
                'success': False,
                'message': 'Invalid credentials'
            }), 401
        
        # Create tokens
        access_token = create_access_token(identity=str(user['_id']))
        refresh_token = create_refresh_token(identity=str(user['_id']))
        
        # Update last login
        db.users.update_one(
            {'_id': user['_id']},
            {'$set': {'last_login': datetime.utcnow()}}
        )
        
        # Remove password from response
        user_data = serialize_doc(user)
        del user_data['password']
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'data': {
                'user': user_data,
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Login error: {str(e)}'
        }), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout endpoint"""
    try:
        # Get the JWT token ID
        jti = get_jwt()['jti']
        
        # Add token to blacklist
        blacklisted_tokens.add(jti)
        
        return jsonify({
            'success': True,
            'message': 'Successfully logged out'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Logout error: {str(e)}'
        }), 500

@auth_bp.route('/refresh-token', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    try:
        current_user_id = get_jwt_identity()
        
        # Verify user still exists and is active
        user = db.users.find_one({'_id': ObjectId(current_user_id)})
        
        if not user or not user.get('is_active', True):
            return jsonify({
                'success': False,
                'message': 'User not found or deactivated'
            }), 401
        
        # Create new access token
        new_access_token = create_access_token(identity=current_user_id)
        
        return jsonify({
            'success': True,
            'message': 'Token refreshed successfully',
            'data': {
                'access_token': new_access_token
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Token refresh error: {str(e)}'
        }), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user information"""
    try:
        current_user_id = get_jwt_identity()
        
        user = db.users.find_one({'_id': ObjectId(current_user_id)})
        
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Remove password from response
        user_data = serialize_doc(user)
        del user_data['password']
        
        return jsonify({
            'success': True,
            'data': user_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching user: {str(e)}'
        }), 500

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Fields that can be updated
        update_fields = {}
        
        if 'first_name' in data:
            update_fields['profile.first_name'] = data['first_name'].strip()
        
        if 'last_name' in data:
            update_fields['profile.last_name'] = data['last_name'].strip()
        
        if 'phone' in data:
            update_fields['profile.phone'] = data['phone'].strip()
        
        if 'avatar' in data:
            update_fields['profile.avatar'] = data['avatar']
        
        if 'organization' in data:
            org_data = data['organization']
            if 'name' in org_data:
                update_fields['organization.name'] = org_data['name'].strip()
            if 'department' in org_data:
                update_fields['organization.department'] = org_data['department'].strip()
        
        if not update_fields:
            return jsonify({
                'success': False,
                'message': 'No valid fields to update'
            }), 400
        
        update_fields['updated_at'] = datetime.utcnow()
        
        # Update user
        result = db.users.update_one(
            {'_id': ObjectId(current_user_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'No changes made'
            }), 400
        
        # Get updated user
        updated_user = db.users.find_one({'_id': ObjectId(current_user_id)})
        user_data = serialize_doc(updated_user)
        del user_data['password']
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'data': user_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating profile: {str(e)}'
        }), 500

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change user password"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        confirm_password = data.get('confirm_password', '')
        
        if not all([current_password, new_password, confirm_password]):
            return jsonify({
                'success': False,
                'message': 'All password fields are required'
            }), 400
        
        if new_password != confirm_password:
            return jsonify({
                'success': False,
                'message': 'New password and confirmation do not match'
            }), 400
        
        # Validate new password
        is_valid, message = validate_password(new_password)
        if not is_valid:
            return jsonify({
                'success': False,
                'message': message
            }), 400
        
        # Get current user
        user = db.users.find_one({'_id': ObjectId(current_user_id)})
        
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Verify current password
        if not bcrypt.check_password_hash(user['password'], current_password):
            return jsonify({
                'success': False,
                'message': 'Current password is incorrect'
            }), 400
        
        # Hash new password
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        
        # Update password
        db.users.update_one(
            {'_id': ObjectId(current_user_id)},
            {
                '$set': {
                    'password': hashed_password,
                    'updated_at': datetime.utcnow()
                }
            }
        )
        
        return jsonify({
            'success': True,
            'message': 'Password changed successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error changing password: {str(e)}'
        }), 500