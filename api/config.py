import os

def _get_env(env: str, default: str):
    if env in os.environ:
        return os.environ[env]

    return default

# Cow Transfer settings
COW_USERNAME = _get_env('COW_USERNAME', '')
COW_PASSWORD = _get_env('COW_PASSWORD', '')

# Database settings
# sqlite / mysql
DATABASE_TYPE = _get_env('DATABASE_TYPE', 'sqlite')

# SQLite settings
SQLITE_NAME = _get_env('SQLITE_NAME', 'cow.db')

# MySQL settings
MYSQL_DB = _get_env('MYSQL_DB', 'cow')
MYSQL_HOST = _get_env('MYSQL_HOST', '127.0.0.1')
MYSQL_PORT = int(_get_env('MYSQL_PORT', 3306))
MYSQL_USER = _get_env('MYSQL_USER', 'root')
MYSQL_PASS = _get_env('MYSQL_PASS', 'password')
