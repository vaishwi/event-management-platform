from flask_restful import Resource
from flask import request, jsonify
import jwt
import datetime


class Authentication(Resource):
    """
    This is a Flask resource that handles authentication. It receives a POST request with authorization credentials and returns a token if the credentials are valid.
    The token is encoded using JWT and has an expiration time of 60 minutes.
    The resource returns a JSON response with the token if the authentication is successful, and a 401 error if it fails.
    The resource is part of a larger Flask application, as indicated by the import statement at the beginning of the code.
    The JWT_SECRET_KEY is a configuration parameter that should be set in the Flask app configuration.
    """

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
