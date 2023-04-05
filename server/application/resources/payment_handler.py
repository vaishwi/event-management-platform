"""
@author Khushi Shah (B00923816)
APIs related to Payment Management.
"""
from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.payments import Payment


class AddPayment(Resource):

    def post(self):
        data = request.get_json()
        response = Payment().add_payment(data)
        return response

    def get(self, id):
        response = {}
        events = Payment().get_payments_id(id)
        response['data'] = events
        return response

    def delete(self, id):
        print("here")
        print(id)
        response = Payment().delete_payment(id)
        print(response)
        if response:
            print(response)
            return True, 200
        return False, 200
