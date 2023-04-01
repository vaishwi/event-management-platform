from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field
from application.business_logic.organizers import Organizer
from application.business_logic.attendee import Attendee

class Credential(Model):
    id = IDField()
    type = TextField()
    email = TextField()
    password = TextField()
    
    firstName = TextField()
    lastName = TextField()
    
    def signup(self, data):
        credential_id = Credential.check_credential(data)
        # credential_id = False
        if (credential_id):
            return "User does exist"
        else:
            credential_id = Credential.add_credential(data)
            id=0
            if (data.get('type') == "organizer"):
                id = Organizer().add_organizer(data, credential_id)
            elif (data.get('type') == "attendee"):
                id = Attendee().add_attendee(data, credential_id)
            return id

    def login(self, data):
        credential = Credential.validate_credential(data)
        if (credential == False):
            return "Credential not found"
        credential_dict = {'id':credential['id'], 'email': credential['email'],'userType':credential['type'], 'firstName':credential['firstName'], 'lastName':credential['lastName']}
        if (credential['type'] == 'organizer'):
            return credential_dict
        elif (credential['type'] == 'attendee'):
            return credential_dict
        elif (credential['type'] == 'admin'):
            return credential_dict
        else:
            return "Credential not found"

    def add_credential(data):
        
        if (data.get("type") == "attendee"):
            credential = Credential(
                type=data.get("type"),
                email=data.get("email"),
                password=data.get("password"),
                firstName=data.get("firstName"),
                lastName = data.get("lastName")
            )
        else:
            credential = Credential(
                type=data.get("type"),
                email=data.get("email"),
                password=data.get("password"),
                firstName="",
                lastName = ""
            )
        credential.save()
        return credential.id
    
    def checkEmail(self, data):
        # return True
        credential_list = Credential.collection.filter(email = data.get('email')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            return True
        else:
            return False
        
    def setNewPassword(self, data):
        credential = Credential.collection.filter(email = data.get('email')).get()
        credential.password = data.get('password')
        credential.update()
        return credential.id

    def check_credential(data):
        # return False
        credential_list = Credential.collection.filter(email = data.get('email'), type=data.get('type')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            return True
        else:
            return False
        
    def validate_credential(data):
        credential_list = Credential.collection.filter(email = data.get('email'), password=data.get('password')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            return credential[0]
        else:
            return False
        