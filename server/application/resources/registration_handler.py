from flask_restful import Resource
from flask import request
from application.business_logic.credential import Credential

class RegistrationEndpoint(Resource):

    def post(self):
        data = request.get_json()
        response = Credential.add_credential(data)
        return response

