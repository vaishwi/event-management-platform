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
    

    def add_organizer(self, data):
        organizer = Organizer(
                organizationName = data.get('organizationName'),
                managedBy = data.get('managedBy'),
                occupation = data.get('occupation'),
                about = data.get('about'),
                contactNo = data.get('contactNo'),
                email = data.get('email'),
                location = data.get('location'),
                state = data.get('state'),
                city = data.get('city'),
                subscribers = data.get('subscribers'),
                isAuthenticated = data.get('isAuthenticated'),
        )
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

    def get_organizer(self,id):
        organizer = Organizer.collection.get(f"organizer/{id}") 
        organizer_dict['data'] = organizer.to_dict()
        organizer_dict['success'] = True
        return organizer

    def get_all_organizer(self):
        organizer_list = Organizer.collection.fetch()
        
        organizers = []
        organizers = [organizer.to_dict() for organizer in organizer_list]
        print(f"Organizer {organizers}")
        return organizers

    def get_authentication_requests(self):
        
        authentication_requests_list = Organizer.collection.filter('isAuthenticated', '==', False).fetch()

        authentication_requests = []
        authentication_requests = [auth_req.to_dict() for auth_req in authentication_requests_list]

        print("type of output: ",type(authentication_requests_list))
        print("type of conversion: ",type(authentication_requests))
        return authentication_requests
