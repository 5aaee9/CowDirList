from api.database.connection import db
import peewee

class CacheModel(peewee.Model):
    dirName = peewee.CharField(unique=True, index=True)
    fileTree = peewee.TextField()
    size = peewee.IntegerField(default=0)

    class Meta:
        database = db
