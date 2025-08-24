from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from app import serialize_doc, require_role

exceptions_bp = Blueprint('exceptions', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

@exceptions_bp.route('', methods=['GET'])
@require_role(['admin'])
def get_all_exceptions():
    return jsonify({
        'success': True,
        'message': 'exceptions endpoint not implemented yet',
        'data': []
    }), 200

@exceptions_bp.route('', methods=['POST'])
@require_role(['admin'])
def create_exceptions():
    return jsonify({
        'success': True,
        'message': 'Create exceptions endpoint not implemented yet'
    }), 201
