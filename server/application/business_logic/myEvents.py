from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field
import requests


class RegisterEvent(Model):
    id = IDField()
    userID = TextField();
    eventID = TextField();
    price = NumberField();
    paymentMethod = TextField();
    count = NumberField();

    def add_registerEvent(self, data):
        eventData = data.get('eventData')
        payment = data.get('payment')
        userID = data.get('id')
        print(userID)
        result = {'payment': payment , 'userId': userID}
        if payment is not None:
            print('calling payment here')
            response_api = requests.post("http://127.0.0.1:5000/addPayment", json={'payment': result})
            if isinstance(response_api, tuple) and len(response_api) == 2:
                response, status_code = response_api
            else:
                response = response_api
            e = RegisterEvent(
                userID=data.get('id'),
                eventID=eventData['id'],
                price=data.get('counter') * eventData['price'],
                paymentMethod=response.json(),
                count=data.get('counter')
            )
            e.save()
            return e.id
        else:
            e = RegisterEvent(
                userID=data.get('id'),
                eventID=eventData['id'],
                price= eventData['price'],
                paymentMethod='0',
                count=0
            )
            e.save()
            return e.id

    def get_registered_event(self, id, eventID):

        try:
            print("before")
            response_list = RegisterEvent.collection.filter(eventID=eventID , userID = id).fetch()
            output = [response.to_dict() for response in response_list]
            if (output):
                print("return true from check_credential")
                return True
            else:
                print("return false")
                return False
        except:
            return False


    def delete_registered_event(self, key):
        print(key)
        try:
            print("before")
            response_list = RegisterEvent.collection.filter(eventID=key).delete()
            response_list = RegisterEvent.collection.filter(eventID=key).fetch()
            output = [response.to_dict() for response in response_list]
            if (output):
                print("return true from check_credential")
                return False
            else:
                print("return false")
                return True
        except:
            return False