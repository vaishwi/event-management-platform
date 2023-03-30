from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field

# const organizer1 = {id:1,organizationName:"Eco Club",managedBy:"Vaishwi Patel", 
# occupation:"Club Owner", about:orgAbout ,contactNo:contactNo, email:email, location:location, 
# subscribers:100,state:"Halifax, NS", isAuthenticated:true}
# https://octabyte.io/FireO/fields/boolean-field/
class Organizer(Model):
    id = IDField()
    organizationName = TextField()
    managedBy = TextField()
    occupation = TextField()
    about = TextField()
    contactNo = TextField()
    email = TextField()
    location = TextField()
    state = TextField()
    city = TextField()
    subscribers = NumberField()
    isAuthenticated = BooleanField()
    

    def add_organizer(self, data, id):
        organizer = Organizer(
                id = id,
                organizationName = data.get('organizationName'),
                managedBy = data.get('managedBy'),
                occupation = data.get('occupation'),
                about = data.get('about'),
                contactNo = data.get('contactNo'),
                email = data.get('email'),
                location = data.get('location'),
                state = data.get('state'),
                city = data.get('city'),
                subscribers = 0,
                isAuthenticated = False,
        )
        print(data)
        print("---------------------------------")
        print(data.get('organizationName'),
               data.get('managedBy'),
               data.get('occupation'),
               data.get('about'),
               data.get('contactNo'),
               data.get('email'),
               data.get('location'),
               data.get('state'),
               data.get('city'),
              )
        print("-----------------------------")
        organizer.save()
        return organizer.id
    

    def get_organizer(self, key):
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

    def get_all_organizer(self):
        organizers = []
        organizer_list = Organizer.collection.fetch()
        
        organizers = [organizer.to_dict() for organizer in organizer_list]
        print(f"Organizer {organizers}")
        return organizers