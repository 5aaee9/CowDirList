from pydantic import BaseModel
from typing import List, Dict, Optional

class UserInfoDocument(BaseModel):
    totalSpace: float
    usedSpace: float

class CowFileDocument(BaseModel):
    guid: str
    transferFileGuid: Optional[str]
    fileName: str
    sizeInByte: int
    downloadName: str
    createdAt: str
    contentType: str
    url: Optional[str]
    uploaded: bool
    folder: bool
    image: bool
    sizeInMbInteger: int

class CowFolderDocument(BaseModel):
    path: str
    guid: str
    name: str
    createdAt: str
    totalSizeInBytes: int
    files: int
    children: int

class CowListDirDocument(BaseModel):
    files: List[CowFileDocument]
    folders: List[CowFolderDocument]
    path: str
    name: str
    guid: str
    currentPage: int
    totalPage: int
