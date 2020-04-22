from .connection import db_state_default, db
from .models.cache import CacheModel
from .models.settings import SettingsModel
from fastapi import Depends

db.connect()
db.create_tables([
    CacheModel,
    SettingsModel
])
db.close()

async def reset_db_state():
    db._state._state.set(db_state_default.copy())
    db._state.reset()

def get_db(db_state=Depends(reset_db_state)):
    try:
        db.connect()
        yield
    finally:
        if not db.is_closed():
            db.close()
