from application.resources.event_handler import Event, Events
from application.resources.authentication import Authentication

def initialize_routes(api):
    api.add_resource(Events, '/events')
    api.add_resource(Event, '/event/<id>', '/event')
    api.add_resource(Authentication, '/auth')
