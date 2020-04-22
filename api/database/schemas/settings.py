from pydantic import BaseModel, constr
from api.utils.peewee import PeeweeGetterDict

class Setting(BaseModel):
    key: str
    value: str

    class Config:
        orm_mode = True
        getter_dict = PeeweeGetterDict
