from fireo.models import Model
import fireo
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field
from application.business_logic.organizers import Organizer
# const organizer1 = {id:1,organizationName:"Eco Club",managedBy:"Vaishwi Patel", 
# occupation:"Club Owner", about:orgAbout ,contactNo:contactNo, email:email, location:location, 
# subscribers:100,state:"Halifax, NS", isAuthenticated:true}
# https://octabyte.io/FireO/fields/boolean-field/
class Attendee(Model):
    id = IDField()
    name = TextField()
    email = TextField()
    contactNo = TextField()
    firstName = TextField()
    lastName = TextField()
    about = TextField()
    location = TextField()
    state = TextField()
    city = TextField()
    occupation = TextField()
    subscribered_organization = ListField()

    '''
    Adding Attendee detail in attendee collection
    Input: 
    '''
    def add_attendee(self, data, id):
        attendee = Attendee(
            id=id,
            # name = data.get("name"),
            firstName = data.get("firstName"),
            lastName = data.get("lastName"),
            contactNo = data.get('contactNo'),
            email = data.get('email'),
            subscribered_organization = []
        )
        attendee.save()
        return attendee.id
    
    def subscribe_organizer(self,data):
        response_dict = {
            "success": False
        }
        try:
            organizer_id = data['organizerId']
            attendee_id = data['attendeeId']
            
            attendee = Attendee.collection.get(f"attendee/{attendee_id}")
            
            attendee.subscribered_organization = fireo.ListUnion([organizer_id])
            attendee.update()
            organizer = Organizer.collection.get(f"organizer/{organizer_id}")
            organizer.subscribed_users = fireo.ListUnion([attendee_id])
            organizer.subscribers = organizer.subscribers+1
            organizer.update()
            response_dict['success'] = True

        except Exception as e:
            print(e)

        return response_dict
    
    def is_attendee_subscribed(self,data):
        response_dict = {
            "success": False,
            "is_subscribed":False

        }
        try:
            organizer_id = data['organizerId']
            attendee_id = data['attendeeId']
            
            attendee = Attendee.collection.get(f"attendee/{attendee_id}")
            subscribed_organizers = attendee.subscribered_organization

            is_organzier_exist = subscribed_organizers.count(organizer_id)
            if(is_organzier_exist>0):
                response_dict['success'] = True
                response_dict['is_subscribed'] = True
            else:
                response_dict['success'] = True
                response_dict['is_subscribed'] = False 
            
        except Exception as e:
            print(e)

        return response_dict

    def get_attendee(self, id):
        attendee = Attendee.collection.get(f"attendee/{id}")
        
        organizer_list = attendee.subscribered_organization

        organizer_list = ["organizer/"+id for id in organizer_list]
        organizer_list = Organizer.collection.get_all(organizer_list)
        organizer_list = [organizer.to_dict() for organizer in organizer_list]
        
        attendee_dict = {"id": id, 
                        "firstName" : attendee.firstName,
                        "lastName" : attendee.lastName,
                        "contactNo" : attendee.contactNo,
                        "email" : attendee.email,
                        "location" :attendee.location,
                        "state" :attendee.state,
                        "city" :attendee.city,
                        "about" :attendee.about,
                        "occupation": attendee.occupation,
                        "subscribered_organization" : organizer_list}

        # attendee['subscribered_organization'] = organizer_list
        print(attendee_dict)
        return attendee_dict
    
    def edit_attendee(self, data):
        print(data)
        attendee = Attendee.collection.get(f"attendee/{data.get('id')}") 
        print(attendee)
        attendee.occupation = data.get('occupation')
        attendee.about = data.get('about')
        attendee.contactNo = data.get('contactNo')
        attendee.location = data.get('location')
        attendee.state = data.get('state')
        attendee.city = data.get('city')
        attendee.update()
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
