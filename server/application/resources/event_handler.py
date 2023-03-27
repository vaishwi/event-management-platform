from flask_restful import Resource
from flask import request
import json
from application.auth_token import token_validator
from application.business_logic.events import Event


class EventsEndpoint(Resource):

    def get(self):
        response = {}
        limit = int(request.args.get('limit', 10))
        page = int(request.args.get('page', 1))
        query = request.args.get('query', None)
        event_type = request.args.get('type', None)
        event_cities = request.args.get('cities', None)
        events = Event.get_all_events(query)

        if query:
            print(query)
            events = [event for event in events if (query in event.get("title"))]

        if event_type:
            events = [event for event in events if event['type'] == event_type]

        if event_cities:
            events = [event for event in events if event['city'] in event_cities]

        response['data'] = events
        return response


class EventEndpoint(Resource):

    # @token_validator
    def get(self, id):
        response = Event.get_event(id)
        if response['success']:
            return response['data'], 200
        return "Event not found", 404

    def post(self, id):
        data = request.get_json()
        response = Event.add_event(data)
        return response

    def put(self, id):
        return f"Update an event with {id}"
