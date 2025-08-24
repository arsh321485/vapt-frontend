from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import re

users_bp = Blueprint('users', __name__)
bcrypt = Bcrypt()

# Get database connection
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

# Import helper functions
from app import serialize_doc, validate_object_id, require_role, paginate_results

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@users_bp.route('', methods=['GET'])
@require_role(['admin'])
def get_all_users():
    """Get all users with pagination and filters"""
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        role = request.args.get('role')
        is_active = request.args.get('is_active')
        search = request.args.get('search')
        organization = request.args.get('organization')
        
        # Build query
        query = {}
        
        if role:
            query['role'] = role
        
        if is_active is not None:
            query['is_active'] = is_active.lower() == 'true'
        
        if organization:
            query['organization.name'] = {'$regex': organization, '$options': 'i'}
        
        if search:
            query['$or'] = [
                {'username': {'$regex': search, '$options': 'i'}},
                {'email': {'$regex': search, '$options': 'i'}},
                {'profile.first_name': {'$regex': search, '$options': 'i'}},
                {'profile.last_name': {'$regex': search, '$options': 'i'}}
            ]
        
        # Get paginated results
        result = paginate_results(db.users, query, page, limit, 'created_at', -1)
        
        # Remove passwords from response
        for user in result['data']:
            if 'password' in user:
                del user['password']
        
        return jsonify({
            'success': True,
            'data': {
                'users': result['data'],
                'pagination': result['pagination']
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching users: {str(e)}'
        }), 500

@users_bp.route('', methods=['POST'])
@require_role(['admin'])
def create_user():
    """Create new user"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Required fields
        required_fields = ['username', 'email', 'password', 'role', 'profile']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        username = data['username'].strip()
        email = data['email'].lower().strip()
        password = data['password']
        role = data['role']
        profile = data['profile']
        
        # Validate email
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        # Validate role
        valid_roles = ['admin', 'user', 'developer']
        if role not in valid_roles:
            return jsonify({
                'success': False,
                'message': f'Role must be one of: {", ".join(valid_roles)}'
            }), 400
        
        # Check if username or email already exists
        existing_user = db.users.find_one({
            '$or': [
                {'username': username},
                {'email': email}
            ]
        })
        
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'Username or email already exists'
            }), 409
        
        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        # Create user document
        user_doc = {
            'username': username,
            'email': email,
            'password': hashed_password,
            'role': role,
            'profile': {
                'first_name': profile.get('first_name', '').strip(),
                'last_name': profile.get('last_name', '').strip(),
                'phone': profile.get('phone', '').strip(),
                'avatar': profile.get('avatar', '')
            },
            'organization': {
                'name': data.get('organization', {}).get('name', '').strip(),
                'department': data.get('organization', {}).get('department', '').strip()
            },
            'permissions': data.get('permissions', []),
            'is_active': data.get('is_active', True),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
            'last_login': None
        }
        
        # Insert user
        result = db.users.insert_one(user_doc)
        
        # Get created user without password
        created_user = db.users.find_one({'_id': result.inserted_id})
        user_data = serialize_doc(created_user)
        del user_data['password']
        
        return jsonify({
            'success': True,
            'message': 'User created successfully',
            'data': user_data
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error creating user: {str(e)}'
        }), 500

@users_bp.route('/<user_id>', methods=['GET'])
@require_role(['admin'])
def get_user_by_id(user_id):
    """Get user by ID"""
    try:
        if not validate_object_id(user_id):
            return jsonify({
                'success': False,
                'message': 'Invalid user ID'
            }), 400
        
        user = db.users.find_one({'_id': ObjectId(user_id)})
        
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

@users_bp.route('/<user_id>', methods=['PUT'])
@require_role(['admin'])
def update_user(user_id):
    """Update user"""
    try:
        if not validate_object_id(user_id):
            return jsonify({
                'success': False,
                'message': 'Invalid user ID'
            }), 400
        
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Check if user exists
        user = db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Build update fields
        update_fields = {}
        
        if 'username' in data:
            username = data['username'].strip()
            # Check if username is already taken by another user
            existing = db.users.find_one({
                'username': username,
                '_id': {'$ne': ObjectId(user_id)}
            })
            if existing:
                return jsonify({
                    'success': False,
                    'message': 'Username already exists'
                }), 409
            update_fields['username'] = username
        
        if 'email' in data:
            email = data['email'].lower().strip()
            if not validate_email(email):
                return jsonify({
                    'success': False,
                    'message': 'Invalid email format'
                }), 400
            # Check if email is already taken by another user
            existing = db.users.find_one({
                'email': email,
                '_id': {'$ne': ObjectId(user_id)}
            })
            if existing:
                return jsonify({
                    'success': False,
                    'message': 'Email already exists'
                }), 409
            update_fields['email'] = email
        
        if 'role' in data:
            role = data['role']
            valid_roles = ['admin', 'user', 'developer']
            if role not in valid_roles:
                return jsonify({
                    'success': False,
                    'message': f'Role must be one of: {", ".join(valid_roles)}'
                }), 400
            update_fields['role'] = role
        
        if 'profile' in data:
            profile = data['profile']
            if 'first_name' in profile:
                update_fields['profile.first_name'] = profile['first_name'].strip()
            if 'last_name' in profile:
                update_fields['profile.last_name'] = profile['last_name'].strip()
            if 'phone' in profile:
                update_fields['profile.phone'] = profile['phone'].strip()
            if 'avatar' in profile:
                update_fields['profile.avatar'] = profile['avatar']
        
        if 'organization' in data:
            org = data['organization']
            if 'name' in org:
                update_fields['organization.name'] = org['name'].strip()
            if 'department' in org:
                update_fields['organization.department'] = org['department'].strip()
        
        if 'permissions' in data:
            update_fields['permissions'] = data['permissions']
        
        if 'is_active' in data:
            update_fields['is_active'] = data['is_active']
        
        if not update_fields:
            return jsonify({
                'success': False,
                'message': 'No valid fields to update'
            }), 400
        
        update_fields['updated_at'] = datetime.utcnow()
        
        # Update user
        result = db.users.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_fields}
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'No changes made'
            }), 400
        
        # Get updated user
        updated_user = db.users.find_one({'_id': ObjectId(user_id)})
        user_data = serialize_doc(updated_user)
        del user_data['password']
        
        return jsonify({
            'success': True,
            'message': 'User updated successfully',
            'data': user_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating user: {str(e)}'
        }), 500

@users_bp.route('/<user_id>', methods=['DELETE'])
@require_role(['admin'])
def delete_user(user_id):
    """Delete user"""
    try:
        if not validate_object_id(user_id):
            return jsonify({
                'success': False,
                'message': 'Invalid user ID'
            }), 400
        
        # Check if user exists
        user = db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Prevent deleting the last admin
        if user.get('role') == 'admin':
            admin_count = db.users.count_documents({'role': 'admin', 'is_active': True})
            if admin_count <= 1:
                return jsonify({
                    'success': False,
                    'message': 'Cannot delete the last admin user'
                }), 400
        
        # Delete user
        result = db.users.delete_one({'_id': ObjectId(user_id)})
        
        if result.deleted_count == 1:
            return jsonify({
                'success': True,
                'message': 'User deleted successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to delete user'
            }), 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error deleting user: {str(e)}'
        }), 500

@users_bp.route('/<user_id>/activate', methods=['POST'])
@require_role(['admin'])
def activate_user(user_id):
    """Activate user account"""
    try:
        if not validate_object_id(user_id):
            return jsonify({
                'success': False,
                'message': 'Invalid user ID'
            }), 400
        
        result = db.users.update_one(
            {'_id': ObjectId(user_id)},
            {
                '$set': {
                    'is_active': True,
                    'updated_at': datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'User not found or already active'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'User activated successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error activating user: {str(e)}'
        }), 500

@users_bp.route('/<user_id>/deactivate', methods=['POST'])
@require_role(['admin'])
def deactivate_user(user_id):
    """Deactivate user account"""
    try:
        if not validate_object_id(user_id):
            return jsonify({
                'success': False,
                'message': 'Invalid user ID'
            }), 400
        
        # Check if user is admin
        user = db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Prevent deactivating the last admin
        if user.get('role') == 'admin':
            admin_count = db.users.count_documents({'role': 'admin', 'is_active': True})
            if admin_count <= 1:
                return jsonify({
                    'success': False,
                    'message': 'Cannot deactivate the last admin user'
                }), 400
        
        result = db.users.update_one(
            {'_id': ObjectId(user_id)},
            {
                '$set': {
                    'is_active': False,
                    'updated_at': datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'User not found or already inactive'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'User deactivated successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error deactivating user: {str(e)}'
        }), 500

@users_bp.route('/<user_id>/permissions', methods=['GET'])
@require_role(['admin'])
def get_user_permissions(user_id):
    """Get user permissions"""
    try:
        if not validate_object_id(user_id):
            return jsonify({
                'success': False,
                'message': 'Invalid user ID'
            }), 400
        
        user = db.users.find_one({'_id': ObjectId(user_id)}, {'permissions': 1, 'role': 1})
        
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': {
                'user_id': user_id,
                'role': user['role'],
                'permissions': user.get('permissions', [])
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error fetching permissions: {str(e)}'
        }), 500

@users_bp.route('/<user_id>/permissions', methods=['PUT'])
@require_role(['admin'])
def update_user_permissions(user_id):
    """Update user permissions"""
    try:
        if not validate_object_id(user_id):
            return jsonify({
                'success': False,
                'message': 'Invalid user ID'
            }), 400
        
        data = request.get_json()
        
        if not data or 'permissions' not in data:
            return jsonify({
                'success': False,
                'message': 'Permissions array is required'
            }), 400
        
        permissions = data['permissions']
        
        if not isinstance(permissions, list):
            return jsonify({
                'success': False,
                'message': 'Permissions must be an array'
            }), 400
        
        # Define valid permissions
        valid_permissions = [
            'read_reports', 'write_reports', 'delete_reports',
            'read_vulnerabilities', 'write_vulnerabilities', 'delete_vulnerabilities',
            'read_assets', 'write_assets', 'delete_assets',
            'read_users', 'write_users', 'delete_users',
            'read_locations', 'write_locations', 'delete_locations',
            'read_teams', 'write_teams', 'delete_teams',
            'read_analytics', 'generate_reports'
        ]
        
        # Validate permissions
        for perm in permissions:
            if perm not in valid_permissions:
                return jsonify({
                    'success': False,
                    'message': f'Invalid permission: {perm}'
                }), 400
        
        result = db.users.update_one(
            {'_id': ObjectId(user_id)},
            {
                '$set': {
                    'permissions': permissions,
                    'updated_at': datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            return jsonify({
                'success': False,
                'message': 'User not found or no changes made'
            }), 404
        
        return jsonify({
            'success': True,
            'message': 'Permissions updated successfully',
            'data': {
                'user_id': user_id,
                'permissions': permissions
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating permissions: {str(e)}'
        }), 500