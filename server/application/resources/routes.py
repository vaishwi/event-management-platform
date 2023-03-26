from application.resources.event_handler import EventEndpoint, EventsEndpoint
from application.resources.authentication import Authentication

def initialize_routes(api):
    api.add_resource(EventsEndpoint, '/events')
    api.add_resource(EventEndpoint, '/event/<id>', '/event')
    api.add_resource(Authentication, '/auth')
