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
        response = RegisterEvent().get_registered_event(id)
        print(response)
        if response:
            print(response)
            return True, 200
        return False, 200


class DeleteRegisteredEvents(Resource):

    def delete(self, id):
        print(id)
        response = RegisterEvent().delete_registered_event(id)
        print(response)
        if response:
            print(response)
            return True, 200
        return False, 200

