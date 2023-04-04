"""
@author Arpitkumar Patel (B00927071)
This code defines a `Credential` class that inherits from the `Model` class of the `fireo` library. The `Credential` class has several methods that interact with the database to perform various operations related to user authentication and authorization.
"""
from fireo.models import Model
from fireo.fields import TextField, IDField
from application.business_logic.organizers import Organizer
from application.business_logic.attendee import Attendee

class Credential(Model):
    id = IDField()
    type = TextField()
    email = TextField()
    password = TextField()
    
    firstName = TextField()
    lastName = TextField()
    
    """
    This method is used to sign up a new user. 
    It first checks if the user already exists by calling the `check_credential` method of the `Credential` class. 
    If the user does not exist, it adds the user's credentials by calling the `add_credential` method of the `Credential` class. 
    It then adds the user to the appropriate table based on their `type` attribute. If the user is an organizer, 
    it calls the `add_organizer` method of the `Organizer` class. If the user is an attendee, 
    it calls the `add_attendee` method of the `Attendee` class. Finally, it returns the ID of the newly created user.
    """
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

    """
    This method is used to validate user credentials and return a dictionary of user information if the credentials are valid. 
    @param data - the user credentials
    @return a dictionary of user information if the credentials are valid, otherwise a string indicating that the credentials were not found.
    """
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

    """
    This code creates a new credential object based on the data provided. If the type of the credential is "attendee", 
    then the first and last name are also included in the object. Otherwise, only the email, password, and type are included. 
    The credential object is then saved to the database and the ID of the credential is returned.
    @param data - a dictionary containing the data for the new credential object
    @return the ID of the newly created credential object
    """
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
    
    """
    This method checks if an email exists in the database.
    @param data - a dictionary containing the email to check
    @return True if the email exists in the database, False otherwise.
    """
    def checkEmail(self, data):
        # return True
        credential_list = Credential.collection.filter(email = data.get('email')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            return True
        else:
            return False
        
    """
    This method sets a new password for a user with the given email address.
    @param data - a dictionary containing the email and new password
    @return the id of the updated credential
    """
    def setNewPassword(self, data):
        credential = Credential.collection.filter(email = data.get('email')).get()
        credential.password = data.get('password')
        credential.update()
        return credential.id

    """
    Given a dictionary of data, check if the credentials exist in the database.
    @param data - a dictionary containing email and type of credential
    @return True if the credentials exist in the database, False otherwise.
    """
    def check_credential(data):
        # return False
        credential_list = Credential.collection.filter(email = data.get('email'), type=data.get('type')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            return True
        else:
            return False
        
    """
    Given a dictionary of data containing an email and password, validate the credentials by checking 
    if there is a match in the Credential collection. If there is a match, return the credential as a dictionary. 
    If there is no match, return False.
    @param data - a dictionary containing an email and password
    @return - a dictionary of the credential if there is a match, False otherwise.
    """
    def validate_credential(data):
        credential_list = Credential.collection.filter(email = data.get('email'), password=data.get('password')).fetch()
        
        credential = [credential.to_dict() for credential in credential_list]
        if(credential):
            return credential[0]
        else:
            return False
        