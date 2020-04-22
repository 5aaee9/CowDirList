import os

def _get_env(env: str, default: str):
    if env in os.environ:
        return os.environ[env]

    return default

COW_USERNAME = _get_env('COW_USERNAME', '')
COW_PASSWORD = _get_env('COW_PASSWORD', '')
