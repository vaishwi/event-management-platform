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
        print('in payment')
        print(data)
        payment = data.get('payment')
        id = data.get('userId')
        print('payment')
        print(payment)
        # print(payment['name'])
        print(id)
        e = Payment(
            cardName=payment['name'],
            cardNumber=payment['cardNumber'],
            expiry=payment['expiry'],
            cvv=payment['cvv'],
            userID=id
        )
        e.save()
        return e.id

    def get_payments_id(self, data):
        response_list = Payment.collection.filter(userID=data).fetch()
        output = [response.to_dict() for response in response_list]
        return output