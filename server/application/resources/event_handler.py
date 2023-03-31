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
        query = request.args.get('query')

        # with open('sample.json', 'r') as fp:
        #     data = json.loads(fp.read())

        # total_pages = int(len(data) / int(limit)) if len(data) % int(limit) == 0 else int(len(data) / int(limit) + 1)
        #
        # event_data = [data[i:i + limit] for i in range(0, len(data), limit)]
        #
        # if page:
        #     response['data'] = event_data[page - 1]
        # response['page'] = page
        # response['limit'] = limit
        # response['total_pages'] = total_pages

        events = Event().get_all_events()
        response['data'] = events
        return response


class EventEndpoint(Resource):

    # @token_validator
    def get(self, id):
        response = Event().get_event(id)
        if response['success']:
            return response['data'], 200
        return "Event not found", 404

    def post(self, id):
        data = request.get_json()
        response = Event().add_event(data)
        return response

    def put(self, id):
        return f"Update an event with {id}"
