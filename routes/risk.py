from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from app import serialize_doc, require_role

risk_bp = Blueprint('risk', __name__)

mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client.vulnerability_db

@risk_bp.route('', methods=['GET'])
@require_role(['admin'])
def get_all_risk():
    return jsonify({
        'success': True,
        'message': 'risk endpoint not implemented yet',
        'data': []
    }), 200

@risk_bp.route('', methods=['POST'])
@require_role(['admin'])
def create_risk():
    return jsonify({
        'success': True,
        'message': 'Create risk endpoint not implemented yet'
    }), 201
