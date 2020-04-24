from api.database.models.cache import CacheModel
from api.database.schemas import cache as schema
from api.schemas.cow import CowListDirDocument
from typing import Optional
import datetime
import time
import json

CACHE_TIME =  60 * 10

def get_cache(path: str, page: int) -> Optional[CowListDirDocument]:
    try:
        data = CacheModel.get(CacheModel.path == path and CacheModel.page == page)

        # Cache expired
        if data.expire_time < datetime.datetime.now().time():
            return None

        return CowListDirDocument(**json.loads(data.fileTree))
    except CacheModel.DoesNotExist:
        return None

def create_cache(path: str, page: int, data: CowListDirDocument):
    cache_to = datetime.datetime.now() + datetime.timedelta(minutes=5)
    CacheModel \
        .insert(path=path, page=page, fileTree=data.json(), expire_time=cache_to) \
        .on_conflict('replace') \
        .execute()
