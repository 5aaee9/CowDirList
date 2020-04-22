from api.database.connection import db
import peewee

class SettingsModel(peewee.Model):
    key = peewee.CharField(unique=True, index=True)
    value = peewee.TextField()

    class Meta:
        database = db
