from flask_restful import Resource
from flask import request, jsonify
from application.auth_token import token_validator


class Events(Resource):

    def get(self):
        # Get events
        return {
            "message": "events"
        }


class Event(Resource):

    @token_validator
    def get(self, id):    
        return f"Get an event with {id}"

    def post(self):
        return f"Add an event"

    def put(self, id):
        return f"Update an event with {id}"
