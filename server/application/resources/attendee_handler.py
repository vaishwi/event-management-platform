from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.attendee import Attendee

class AttendeeEndpoint(Resource):
    def get(self, id):
        response = {}
        attendee = Attendee().get_attendee(id)
        response = attendee
        return response
    
class EditAttendeeEndpoint(Resource):
    def post(self):
        data = request.get_json()
        response = Attendee().edit_attendee(data)
        return response