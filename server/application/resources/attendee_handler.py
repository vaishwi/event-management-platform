from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.attendee import Attendee
"""
This is a Flask RESTful API endpoint that retrieves an attendee by their ID.
The endpoint is accessed via an HTTP GET request.
@param id - the ID of the attendee to retrieve
@return a JSON response containing the attendee's information
"""
class AttendeeEndpoint(Resource):
   
    def get(self, id):
        response = {}
        attendee = Attendee().get_attendee(id)
        response = attendee
        return response
    
"""
This is a Flask endpoint that handles a POST request to edit an attendee's information. 
The endpoint receives a JSON object in the request body, which is passed to the `edit_attendee` method of the `Attendee` class. The response from the `edit_attendee` method is returned as the response from the endpoint.
@return The response from the `edit_attendee` method of the `Attendee` class.
"""
class EditAttendeeEndpoint(Resource):
    def post(self):
        data = request.get_json()
        response = Attendee().edit_attendee(data)
        return response