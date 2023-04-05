"""
@author Khushi Shah (B00923816)
APIs related to Registered Events Management.
"""
from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.myEvents import RegisterEvent


class AddRegisterEvents(Resource):

    """
    This is a Flask API endpoint that receives a POST request with JSON data. The JSON data is printed to the console and then passed to the `add_registerEvent` method of the `RegisterEvent` class. The response from this method is returned as the response to the POST request.
    @return The response to the POST request.
    """
    def post(self):
        data = request.get_json()
        print(data)
        response = RegisterEvent().add_registerEvent(data)
        return response

    """
        This function takes in an id and an eventID and returns a boolean value and a status code. It first prints the id and eventID. It then calls the get_registered_event function from the RegisterEvent class and passes in the id and eventID. If the response is not None, it prints the response and returns True and a status code of 200. Otherwise, it returns False and a status code of 200. 
        @param id - the id of the event
        @param eventID - the event ID
        @return a tuple containing a boolean value and a status code.
    """
    def get(self, id, eventID):
        
        print(id)
        print(eventID)
        response = RegisterEvent().get_registered_event(id,eventID)
        print(response)
        if response:
            print(response)
            return True, 200
        return False, 200

"""
    This is a Flask RESTful resource that handles GET requests for a specific user's registered events. 
"""
class GetRegisterEvents(Resource):
   
    def get(self, id):
        response = RegisterEvent().get_registered_event_by_user_id(id)
        print(response)
        if response:
            print(response)
            return response
        return []


"""
This is a Flask RESTful API endpoint that returns a list of registered users for a given event ID.
The HTTP method used is GET.
@param id - the ID of the event for which we want to retrieve the registered users.
@return a list of registered users for the given event ID.
"""
class GetRegisterUsers(Resource):
    def get(self, id):
        users = RegisterEvent().get_registered_users_by_event_id(id)
        return users



"""
This is a Flask RESTful API endpoint that handles HTTP DELETE requests to delete a registered event with a given ID. 
"""
class DeleteRegisteredEvents(Resource):

    def delete(self, id):
        print(id)
        response = RegisterEvent().delete_registered_event(id)
        print(response)
        if response:
            print(response)
            return True, 200
        return False, 200

