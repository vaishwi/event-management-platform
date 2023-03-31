from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field

# const organizer1 = {id:1,organizationName:"Eco Club",managedBy:"Vaishwi Patel", 
# occupation:"Club Owner", about:orgAbout ,contactNo:contactNo, email:email, location:location, 
# subscribers:100,state:"Halifax, NS", isAuthenticated:true}
# https://octabyte.io/FireO/fields/boolean-field/
class Attendee(Model):
    id = IDField()
    name = TextField()
    email = TextField()
    contactNo = TextField()

    def add_attendee(self, data, id):
        attendee = Attendee(
            id=id,
            name = data.get("name"),
            contactNo = data.get('contactNo'),
            email = data.get('email'),
        )
        attendee.save()
        return attendee.id
    

    # def get_organizer(self, key):
    #     event_dict = {
    #         "success": False,
    #         "data": {}
    #     }
    #     try:
    #         event = Event.collection.get(f"event/{key}") 
    #         event_dict['data'] = event.to_dict()
    #         event_dict['success'] = True
    #     except Exception as e:
    #         print(e)
    #     return event_dict

    # def get_all_organizer(self):
    #     organizers = []
    #     organizer_list = Organizer.collection.fetch()
        
    #     organizers = [organizer.to_dict() for organizer in organizer_list]
    #     print(f"Organizer {organizers}")
    #     return organizers