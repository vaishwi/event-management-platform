from flask import Flask, jsonify, request
from flask_cors import CORS
import jwt
from functools import wraps
import datetime
from flask_restful import Api
from application.resources.routes import initialize_routes
app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = 'mysecretkey'
app.config['JWT_SECRET_KEY'] = 'pythonjwtsecretkey'


CORS(app, resources={r"/*": {"origins": "*"}})

initialize_routes(api)




