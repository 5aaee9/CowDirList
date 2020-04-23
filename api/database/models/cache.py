from api.database.connection import db
import peewee

class CacheModel(peewee.Model):
    path = peewee.CharField(unique=True, index=True)
    fileTree = peewee.TextField()
    page = peewee.IntegerField(default=0)
    expire_time = peewee.DateField()

    class Meta:
        database = db
