from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field
from application.business_logic.organizers import Organizer
from application.business_logic.attendee import Attendee

class Credential(Model):
    id = IDField()
    type = TextField()
    email = TextField()
    password = TextField()
    # description = TextField()
    # banner_image = TextField()
    # images = ListField()
    # date = TextField()
    # time = TextField()
    # address = TextField()
    # price = NumberField()
    # city = TextField()
    # country = TextField()
    # runtime = NumberField()
    
    def signup(self, data):
        # credential_id = Credential.check_credential(data)
        credential_id = False
        if (credential_id):
            print("return 'User does exist' from signup")
            return "User does exist"
        else:
            credential_id = Credential.store_credential(data)
            print("return 'User does not exist' from signup")
            id=0
            if (data.get('type') == "organizer"):
                id = Organizer().add_organizer(data, credential_id)
                print('credential_id:', credential_id)
                print('organizer id:', id)
            elif (data.get('type') == "attendee"):
                id = Attendee().add_attendee(data, credential_id)
                print('credential_id:', credential_id)
                print('Attendee id:', id)
            return id

    def login(self, data):
        credential = Credential.validate_credential(data)
        print('in signin server:', credential)
        if (credential == False):
            return "Credential not found"
        if (credential['type'] == 'organizer'):
            print("Login as organizer")
            return {'id':credential['id'], 'email': credential['email'],'userType':credential['type']}
        elif (credential['type'] == 'attendee'):
            print("Login as attendee")
            return {'id':credential['id'], 'email': credential['email'],'userType':credential['type']}
        elif (credential['type'] == 'admin'):
            print("Login as admin")
            return {'id':credential['id'], 'email': credential['email'],'userType':credential['type']}
        else:
            return "Credential not found"

    def add_credential(self, data):
        print(data)
        credential_list = Credential.collection.fetch()
        credentials = [credential.to_dict() for credential in credential_list]
        print(f"Credentials {credentials}")
        print(credential_list)
        credential = Credential(
            type=data.get("type"),
            email=data.get("email"),
            password=data.get("password")
        )
        credential.save()
        print(credential.id)
        return credential.id
    
    def checkEmail(self, data):
        return True
        print(data)
        credential_list = Credential.collection.filter(email = data.get('email')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            print("return true from checkEmail")
            return True
        else:
            print("return false from checkEmail")
            return False
        
    def setNewPassword(self, data):
        credential = Credential.collection.filter(email = data.get('email')).get()
        print("fetch: ", credential)
        credential.password = data.get('password')
        print("After update:", credential)
        credential.update()
        return credential.id

    def check_credential(data):
        # return False
        print(data)
        credential_list = Credential.collection.filter(email = data.get('email'), type=data.get('type')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            print("return true from check_credential")
            return True
        else:
            return False
        
    def validate_credential(data):
        credential_list = Credential.collection.filter(email = data.get('email'), password=data.get('password')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            print("return true from validate_credential")
            return credential[0]
        else:
            return False
        
    def store_credential(data):
        credential = Credential(
            type = data.get('type'),
            email = data.get('email'),
            password = data.get('password'),
        )
        credential.save()
        return credential.id