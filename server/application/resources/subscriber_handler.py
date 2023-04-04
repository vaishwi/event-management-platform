"""
The code defines two Flask RESTful endpoints for handling subscriber requests. 
"""
from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.attendee import Attendee



class SubscriberCheckEndpoint(Resource):

    """
    This is a Flask API endpoint that handles POST requests. It receives a JSON payload in the request, and passes it to the `is_attendee_subscribed` method of the `Attendee` class. If the response is successful, it returns the response with a 200 status code. If there is an error, it returns a "Server Error" message with a 404 status code.
    @return The response of the API endpoint.
    """
    def post(self):
        print("inside post")
        print(request)
        print("In subscribe handler")
        data = request.get_json()
        print(data)
        response = {}
        response = Attendee().is_attendee_subscribed(data)
        
        if response['success']:
            print(response)
            return response, 200
        return "Server Error", 404

class SubscriberEndpoint(Resource):

    """
    This is a Flask API endpoint that receives a POST request with JSON data. The JSON data is passed to the `subscribe_organizer` method of the `Attendee` class. If the response from the `subscribe_organizer` method indicates success, the response is returned with a 200 status code. Otherwise, a "Server Error" message is returned with a 404 status code.
    @return The response from the `subscribe_organizer` method or a "Server Error" message with a 404 status code.
    """
    def post(self):
        data = request.get_json()
        response = {}
        response = Attendee().subscribe_organizer(data)

        if response['success']:
            print(response)
            return response, 200
        return "Server Error", 404

    
        
        
