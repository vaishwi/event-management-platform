from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.organizers import Organizer

class OrganizersEndpoint(Resource):
    def get(self):
        response = {}
        organizers = Organizer().get_all_organizer()
        response['data'] = organizers
        return response

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

class UnauthenticateOrganizerEndPoint(Resource):
    def get(self):
        response = {}
        unauthenticate_organizers = Organizer().get_authentication_requests()
        response['data'] = unauthenticate_organizers
        return response