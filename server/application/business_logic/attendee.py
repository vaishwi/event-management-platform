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
    firstName = TextField()
    lastName = TextField()

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
        )
        attendee.save()
        return attendee.id
