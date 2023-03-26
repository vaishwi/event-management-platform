from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field


class Event(Model):
    id = IDField()
    title = TextField()
    description = TextField()
    banner_image = TextField()
    images = ListField()
    date = TextField()
    time = TextField()
    address = TextField()
    price = NumberField()
    city = TextField()
    country = TextField()
    runtime = NumberField()
    organizer = TextField()
    type = TextField()

    @classmethod
    def add_event(cls, data):
        e = Event(
            title=data.get('title'),
            description=data.get('description'),
            banner_image=data.get('banner_image'),
            images=data.get('images'),
            date=data.get('date'),
            time=data.get('time'),
            address=data.get('address'),
            price=float(data.get('price')),
            city=data.get('city'),
            country=data.get('country'),
            runtime=int(data.get('runtime')),
            organizer=data.get('organizer'),
            type="Paid" if float(data.get('price')) > 0 else "Free"
        )
        e.save()
        return e.id
    
    @classmethod
    def get_event(cls, key):
        event_dict = {
            "success": False,
            "data": {}
        }
        try:
            event = Event.collection.get(f"event/{key}") 
            event_dict['data'] = event.to_dict()
            event_dict['success'] = True
        except Exception as e:
            print(e)
        return event_dict

    @classmethod

    def get_all_events(cls):
        events = []
        event_list = Event.collection.fetch()
        
        events = [event.to_dict() for event in event_list]
        print(f"Events {events}")
        return events
