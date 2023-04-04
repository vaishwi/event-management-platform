"""
@author Purvesh Rathod (B00903204)
Validate JWT token coming in the request header. Secure the APIs.
"""
import jwt
import logging
from flask import request
from functools import wraps


def token_validator(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        from application import app

        token = None

        if 'token' in request.headers:
            token = request.headers['token']
        if not token:
            return {'message': 'Token is missing!'}, 401
        try:
            is_valid_jwt = jwt.decode(
                token, app.config['JWT_SECRET_KEY'], 'HS256')
        except Exception as exc:
            logging.exception(exc)
            return {'message': 'Token is invalid'}, 401
        return f(*args, **kwargs)

    return decorated
