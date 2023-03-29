from application.resources.event_handler import EventEndpoint, EventsEndpoint
from application.resources.authentication import Authentication
from application.resources.registration_handler import RegistrationEndpoint
from application.resources.organizer_handler import OrganizerEndPoint, OrganizersEndpoint

def initialize_routes(api):
    api.add_resource(EventsEndpoint, '/events')
    api.add_resource(EventEndpoint, '/event/<id>', '/event')
    api.add_resource(Authentication, '/auth')
    api.add_resource(RegistrationEndpoint, '/registration')
    api.add_resource(OrganizersEndpoint,'/organizers')
    api.add_resource(OrganizerEndPoint,'/organizer')
