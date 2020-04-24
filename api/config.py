import os

def _get_env(env: str, default: str):
    if env in os.environ:
        return os.environ[env]

    return default

# Cow Transfer settings
COW_USERNAME = _get_env('COW_USERNAME', '')
COW_PASSWORD = _get_env('COW_PASSWORD', '')

# Database settings
DATABASE_TYPE = _get_env('DATABASE_TYPE', 'sqlite')

# SQLite settings
SQLITE_NAME = _get_env('SQLITE_NAME', 'cow.db')
