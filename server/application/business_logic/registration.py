from fireo.models import Model
from fireo.fields import TextField, NumberField, DateTime, IDField, BooleanField, ListField, Field

class Registration(Model):
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
    
    @classmethod
    def add_credential(cls, data):
        print(data)
        credential_list = Registration.collection.fetch()
        credentials = [credential.to_dict() for credential in credential_list]
        print(f"Credentials {credentials}")
        print(credential_list)
        credential = Registration(
            type=data.get("type"),
            email=data.get("email"),
            password=data.get("password")
        )
        credential.save()
        print(credential.id)
        return credential.id
