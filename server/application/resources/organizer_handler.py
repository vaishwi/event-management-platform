"""
@author Vaishwi Patel (B00914336)
This code defines several Flask RESTful endpoints for interacting with an Organizer resource. 
"""
from flask_restful import Resource

from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.organizers import Organizer

"""
This is a Flask RESTful API endpoint that returns all the organizers in the database.
It returns a dictionary containing the data of all the organizers.
The HTTP method used is GET.
@return A dictionary containing the data of all the organizers.
"""
class OrganizersEndpoint(Resource):
    def get(self):
        response = {}
        organizers = Organizer().get_all_organizer()
        response['data'] = organizers
        return response

"""
This is a Flask RESTful API endpoint for an Organizer resource. It has four methods: POST, GET, PUT, and DELETE. 
"""
class OrganizerEndPoint(Resource):
    def post(self):
        data = request.get_json()
        response = Organizer().add_organizer(data)
        return response

    def get(self,id):
        response = Organizer().get_organizer(id)
        if response['success']:
            print(response)
            return response['data'], 200
        return "Organizer not found", 404

    def post(self,id):
        response = Organizer().authenticate_organizer(id)
        if response['success']:
            print(response)
            return response, 200
        return "Authentication failed.", 404

    def delete(self,id):
        response = Organizer().remove_organzier(id)
        if response['success']:
            print(response)
            return response, 200
        return "Organizer not Deleted.", 404

"""
This is a Flask RESTful endpoint that returns a list of unauthenticated organizers.
The endpoint is accessed via an HTTP GET request.
@return A dictionary containing the list of unauthenticated organizers.
"""
class UnauthenticateOrganizerEndPoint(Resource):
    def get(self):
        response = {}
        unauthenticate_organizers = Organizer().get_authentication_requests()
        response['data'] = unauthenticate_organizers
        return response

"""
This is a Flask endpoint that handles a POST request to edit an organizer. It receives a JSON object in the request body, passes it to the `edit_organizer` method of the `Organizer` class, and returns the response.
@return The response from the `edit_organizer` method of the `Organizer` class.
"""
class EditOrganizerEndpoint(Resource):
    def post(self):
        data = request.get_json()
        response = Organizer().edit_organizer(data)
        return response