from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.myEvents import RegisterEvent


class AddRegisterEvents(Resource):

    def post(self):
        data = request.get_json()
        print(data)
        response = RegisterEvent().add_registerEvent(data)
        return response

    def get(self, id):
        response = RegisterEvent().get_registered_event_by_id(id)
        print(response)
        if response:
            print(response)
            return response["data"], 200
        return "Event not found", 404


class GetRegisterEvents(Resource):
    def get(self, id):
        response = RegisterEvent().get_registered_event_by_user_id(id)
        print(response)
        if response:
            print(response)
            return response
        return []


class GetRegisterUsers(Resource):
    def get(self, id):
        response = {}
        users = RegisterEvent().get_registered_users_by_event_id(id)
        response['data'] = users
        return response


class DeleteRegisteredEvents(Resource):

    def delete(self, id):
        print(id)
        response = RegisterEvent().delete_registered_event(id)
        print(response)
        if response:
            print(response)
            return True, 200
        return False, 200

