from api.database.services import settings
from .cookies import parse_cookies
from api.schemas import cow
from typing import Dict
from api import config
import requests

COW_BASE_API = 'https://cowtransfer.com/'
EMAIL_LOGIN_API = COW_BASE_API + 'user/emaillogin'
GET_USER_MESSAGES = COW_BASE_API + 'user/messages'
GET_USER_INFO = COW_BASE_API + 'space/in/info'

SETTINGS_KEY = 'cow_key'

class CowTransfer(object):
    key: str
    def __init__(self, key = ''):
        self.key = key

    def _get_cookies_header(self) -> Dict[str, str]:
        return {
            'cookie':  f'remember-me={self.key}',
            'referer': 'https://cowtransfer.com/'
        }

    def login(self):
        res = requests.post(EMAIL_LOGIN_API, files={
            "email": (None, config.COWCOW_USERNAME),
            "password": (None, config.COW_PASSWORD)
        }, headers={
            "referer": "https://cowtransfer.com/login"
        })

        if 'Set-Cookie' in res.headers:
            cookie = parse_cookies(res.headers['Set-Cookie'])
            if 'remember-me' in cookie:
                key = cookie['remember-me']
                self.key = key
                settings.set_settings(SETTINGS_KEY, key)
                return

        raise Exception('User login failed')

    def is_login(self):
        res = requests.get(GET_USER_MESSAGES, allow_redirects=False, headers=self._get_cookies_header())

        if res.status_code == 302:
            return False
        return True

    def user_info(self) -> cow.UserInfoDocument:
        res = requests.get(GET_USER_INFO, headers=self._get_cookies_header())

        return cow.UserInfoDocument(**res.json())

def get_cow() -> CowTransfer:
    key = settings.get_settings(SETTINGS_KEY)
    if key is None:
        key = ''

    cow = CowTransfer(key)

    if not cow.is_login():
        cow.login()

    return cow
