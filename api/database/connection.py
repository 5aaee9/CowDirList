from contextvars import ContextVar
from api import config
import peewee

db_state_default = {"closed": None, "conn": None, "ctx": None, "transactions": None}
db_state = ContextVar("db_state", default=db_state_default.copy())

class PeeweeConnectionState(peewee._ConnectionState):
    def __init__(self, **kwargs):
        super().__setattr__("_state", db_state)
        super().__init__(**kwargs)

    def __setattr__(self, name, value):
        self._state.get()[name] = value

    def __getattr__(self, name):
        return self._state.get()[name]

db = None

if config.DATABASE_TYPE == "mysql":
    db = peewee.MySQLDatabase(config.MYSQL_DB, host=config.MYSQL_HOST,
        port=config.MYSQL_PORT, user=config.MYSQL_USER, password=config.MYSQL_PASS)
else:
    db = peewee.SqliteDatabase(config.SQLITE_NAME, check_same_thread=False)

db._state = PeeweeConnectionState()
