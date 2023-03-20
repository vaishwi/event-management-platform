from flask_restful import Resource
from flask import request, jsonify
import jwt
import datetime


class Authentication(Resource):

    def post(self):
        from application import app

        auth = request.authorization
        if not auth or not auth.username or not auth.password:
            response = {'message': 'Missing authorization properties'}
            return jsonify(response), 401

        if auth.password == "admin" and auth.username == "admin":
            token = jwt.encode({
                'iss': auth.username, 'sub': 'headhunter-candidate',
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
            }, app.config['JWT_SECRET_KEY'], 'HS256')
            response = {'token': token}
            return response, 200

        response = {'message': 'Could not verify'}
        return response, 401
