from pydantic import BaseModel

class UserInfoDocument(BaseModel):
    totalSpace: float
    usedSpace: float
