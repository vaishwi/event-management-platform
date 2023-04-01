from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.attendee import Attendee


class SubscrtiberEndpoint(Resource):
    def post(self):
        data = request.get_json()
        response = {}
        response = Attendee().subscribe_organizer(data)

        if response['success']:
            print(response)
            return response, 200
        return "Server Error", 404

    def get(self):
        data = request.get_json()
        response = {}
        response = Attendee().is_attendee_subscribed(data)
        
        if response['success']:
            print(response)
            return response, 200
        return "Server Error", 404
        
        
