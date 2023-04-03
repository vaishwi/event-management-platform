from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field
import requests

from application.business_logic.attendee import Attendee


class RegisterEvent(Model):
    id = IDField()
    userID = TextField();
    eventID = TextField();
    price = NumberField();
    paymentMethod = TextField();
    count = NumberField();
    eventName = TextField();
    eventAddress = TextField();
    eventDate = TextField();
    eventOrganizer = TextField();
    eventType = TextField();
    eventBanner = TextField();
    eventCity = TextField();
    eventCountry = TextField();
    eventTime = TextField();
    # //event Name, event Address, event Date, event Organizer, user Name, type, banner_image city country time

    def add_registerEvent(self, data):
        eventData = data.get('eventData')
        payment = data.get('payment')
        userID = data.get('id')
        paymentID = data.get('paymentID')
        print('Payment ID:')
        print(paymentID)
        print('event data')
        print(eventData)
        result = {'payment': payment , 'userId': userID}
        if payment is not None:
            print('calling payment here')
            print(result)
            if paymentID is None:
                response_api = requests.post("http://127.0.0.1:5000/addPayment", json={'payment': payment, 'userId': userID})
                if isinstance(response_api, tuple) and len(response_api) == 2:
                    response, status_code = response_api
                else:
                    response = response_api
                e = RegisterEvent(
                    userID=data.get('id'),
                    eventID=eventData['id'],
                    price=data.get('counter') * eventData['price'],
                    paymentMethod=response.json(),
                    count=data.get('counter'),
                    eventName=eventData['title'],
                    eventAddress=eventData['address'],
                    eventDate=eventData['date'],
                    eventOrganizer=eventData['organizer'],
                    eventType=eventData['type'],
                    eventBanner=eventData['banner_image'],
                    eventCity=eventData['city'],
                    eventCountry=eventData['country'],
                    eventTime=eventData['time'],
                )
                e.save()
                return e.id
            else:
                e = RegisterEvent(
                    userID=data.get('id'),
                    eventID=eventData['id'],
                    price=data.get('counter') * eventData['price'],
                    paymentMethod=paymentID,
                    count=data.get('counter'),
                    eventName=eventData['title'],
                    eventAddress=eventData['address'],
                    eventDate=eventData['date'],
                    eventOrganizer=eventData['organizer'],
                    eventType=eventData['type'],
                    eventBanner=eventData['banner_image'],
                    eventCity=eventData['city'],
                    eventCountry=eventData['country'],
                    eventTime=eventData['time'],
                )
                e.save()
                return e.id

        else:
            e = RegisterEvent(
                userID=data.get('id'),
                eventID=eventData['id'],
                price= eventData['price'],
                paymentMethod='0',
                count=0,
                eventName=eventData['title'],
                eventAddress=eventData['address'],
                eventDate=eventData['date'],
                eventOrganizer=eventData['organizer'],
                eventType=eventData['type'],
                eventBanner=eventData['banner_image'],
                eventCity=eventData['city'],
                eventCountry=eventData['country'],
                eventTime=eventData['time'],
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

    def get_registered_event_by_id(self, key):
        registered_event_dict = {
            "success": False,
            "data": {}
        }
        try:
            event = RegisterEvent.collection.get(f"register_event/{key}")
            registered_event_dict['data'] = event.to_dict()
            registered_event_dict['success'] = True
        except Exception as e:
            print(e)
        return registered_event_dict

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

    def get_registered_event_by_user_id(self, key):
        registered_events = []
        try:
            events = RegisterEvent.collection.filter('userID', '==', key).fetch()
            registered_events = [event.to_dict() for event in events]
            return registered_events
        except Exception as e:
            print(e)
        return registered_events

    def get_registered_users_by_event_id(self, key):
        registered_users = []
        try:
            events = RegisterEvent.collection.filter('eventID', '==', key).fetch()
            registered_events = [event.to_dict() for event in events]
            for event in registered_events:
                if "userID" in event:
                    try:
                        users = Attendee.collection.filter('id', '==', event["userID"]).fetch()
                        temp = [u.to_dict() for u in users]
                        registered_users.append(temp)
                    except Exception as e:
                        print(e)
            return registered_users
        except Exception as e:
            print(e)
        return registered_users
