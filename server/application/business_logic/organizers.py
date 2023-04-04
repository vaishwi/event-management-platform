"""
This code defines a `Organizer` class that inherits from the `Model` class of the `fireo.models` module. The `Organizer` class has several fields that represent the attributes of an organizer. The class has several methods that perform CRUD operations on the `Organizer` model. 
"""
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
    subscribed_users = ListField()
    
    """
        This is a method of a class. It adds an organizer to the data with the given id.
        @param self - the instance of the class
        @param data - the data to add the organizer to
        @param id - the id of the organizer to add
        @return None
    """
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
                subscribed_users =[]
        )
        organizer.save()
        return organizer.id
    
     """
        This is a method of a class, but it seems to be incomplete. It takes an `id` parameter, but it is unclear what it is supposed to do with it. Please provide more context or the full implementation of the method.
    """
    def remove_organzier(self,id):
       
        response_dict = {
            "success": False
        }
        try:
            Organizer.collection.delete(f"organizer/{id}")
            response_dict['success'] = True
        except Exception as e:
            print(e)
            
        return response_dict

    """
        Given an id, authenticate the organizer with that id by updating their `isAuthenticated` field to `True`.
        @param self - the instance of the class
        @param id - the id of the organizer to authenticate
        @return a dictionary with a `success` key indicating whether the authentication was successful or not.
    """
    def authenticate_organizer(self,id):
        
        organizer_dict = {
            "success": False
        }
        try:
            org = Organizer.collection.get(f"organizer/{id}")
            org.isAuthenticated = True
            org.update()
            organizer_dict['success'] = True
        except Exception as e:
            print(e)
            
        return organizer_dict

    """
        Given an id, retrieve the organizer from the database and return it as a dictionary.
        @param self - the instance of the class
        @param id - the id of the organizer to retrieve
        @return a dictionary containing the organizer data and a success flag indicating whether the retrieval was successful.
    """
    def get_organizer(self,id):
        
        organizer_dict = {
            "success": False,
            "data": {}
        }
        try:
            organizer = Organizer.collection.get(f"organizer/{id}") 
            organizer_dict['data'] = organizer.to_dict()
            organizer_dict['success'] = True
            
        except Exception as e:
            print(e)
        return organizer_dict

    """
        Fetch all organizers from the database and return them as a list of dictionaries.
        @return A list of dictionaries containing all organizers in the database.
    """
    def get_all_organizer(self):
        
        organizer_list = Organizer.collection.fetch()
        
        organizers = []
        organizers = [organizer.to_dict() for organizer in organizer_list]
        print(f"Organizer {organizers}")
        return organizers

     """
        This method retrieves all authentication requests from the database that have not yet been authenticated. It then converts the retrieved objects to a list of dictionaries and returns it.
        @return A list of dictionaries containing the authentication requests that have not yet been authenticated.
    """
    def get_authentication_requests(self):
        
        authentication_requests_list = Organizer.collection.filter('isAuthenticated', '==', False).fetch()

        authentication_requests = []
        authentication_requests = [auth_req.to_dict() for auth_req in authentication_requests_list]

        print("type of output: ",type(authentication_requests_list))
        print("type of conversion: ",type(authentication_requests))
        return authentication_requests

    """
        Given an organizer and data, update the organizer's fields with the new data.
        @param self - the instance of the class
        @param data - the new data to update the organizer with
        @return the id of the updated organizer
    """
    def edit_organizer(self, data):
        
        print(data)
        organizer = Organizer.collection.get(f"organizer/{data.get('id')}") 
        print(organizer)
        organizer.organizationName = data.get('organizationName')
        organizer.managedBy = data.get('managedBy')
        organizer.occupation = data.get('occupation')
        organizer.about = data.get('about')
        organizer.contactNo = data.get('contactNo')
        organizer.location = data.get('location')
        organizer.state = data.get('state')
        organizer.city = data.get('city')
        organizer.update()
        return organizer.id
