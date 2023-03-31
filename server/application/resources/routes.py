from application.resources.event_handler import EventEndpoint, EventsEndpoint
from application.resources.authentication import Authentication
from application.resources.registerEvent_handler import AddRegisterEvents
from application.resources.payment_handler import AddPayment
from application.resources.registerEvent_handler import DeleteRegisteredEvents


def initialize_routes(api):
    api.add_resource(EventsEndpoint, '/events')
    api.add_resource(EventEndpoint, '/event/<id>', '/event')
    api.add_resource(Authentication, '/auth')
    api.add_resource(AddRegisterEvents, '/registerEvent', '/registerEvent/<id>')
    api.add_resource(AddPayment, '/addPayment', '/getPayments/<id>')
    api.add_resource(DeleteRegisteredEvents, '/deleteEvent/<id>')
