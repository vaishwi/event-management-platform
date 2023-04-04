"""
@author Purvesh Rathod (B00903204)
Initialize Flask application and initialize routes
"""
from flask import Flask
from flask_cors import CORS
import fireo
from flask_restful import Api
from application.resources.routes import initialize_routes
app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = 'mysecretkey'
app.config['JWT_SECRET_KEY'] = 'pythonjwtsecretkey'


CORS(app, resources={r"/*": {"origins": "*"}})

fireo.connection(
    from_file="firebase-credential.json")

initialize_routes(api)




