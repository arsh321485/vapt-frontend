from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from app import serialize_doc, require_role

teams_bp = Blueprint('teams', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

@teams_bp.route('', methods=['GET'])
@require_role(['admin'])
def get_all_teams():
    return jsonify({
        'success': True,
        'message': 'teams endpoint not implemented yet',
        'data': []
    }), 200

@teams_bp.route('', methods=['POST'])
@require_role(['admin'])
def create_teams():
    return jsonify({
        'success': True,
        'message': 'Create teams endpoint not implemented yet'
    }), 201
