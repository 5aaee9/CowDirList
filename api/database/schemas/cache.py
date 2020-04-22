from pydantic import BaseModel, constr
from api.utils.peewee import PeeweeGetterDict

class Cache(BaseModel):
    dirName = str
    fileTree = str
    size = int

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict
