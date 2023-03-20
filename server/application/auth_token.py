from flask import request
from functools import wraps
from flask import jsonify
import jwt


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
        except:
            return {'message': 'Token is invalid'}, 401
        return f(*args, **kwargs)

    return decorated
