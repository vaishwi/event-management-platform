from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field


class Payment(Model):
    id = IDField()
    cardName = TextField();
    cardNumber = TextField();
    expiry = TextField();
    cvv = TextField();
    userID = TextField();

    def add_payment(self, data):
        e = Payment(
            cardName=data.get('name'),
            cardNumber=data.get('cardNumber'),
            expiry=data.get('expiry'),
            cvv=data.get('cvv'),
            userID="2"
        )
        e.save()
        return e.id

    def get_payments_id(self, data):
        response_list = Payment.collection.filter(userID=data).fetch()
        output = [response.to_dict() for response in response_list]
        return output