from api.database.services import settings
from .cookies import parse_cookies
from api.schemas import cow
from typing import Dict
from api import config
import urllib.parse
import requests

COW_BASE_API = 'https://cowtransfer.com/'
EMAIL_LOGIN_API = COW_BASE_API + 'user/emaillogin'
GET_USER_MESSAGES = COW_BASE_API + 'user/messages'
GET_USER_INFO = COW_BASE_API + 'space/in/info'
LIST_DIR_URL = COW_BASE_API + 'space'
DOWNLOAD_ENDPOINT = COW_BASE_API + 'space/in/file/download'

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
            "email": (None, config.COW_USERNAME),
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

    def list_dir(self, path: str, page: int) -> cow.CowListDirDocument:
        params = urllib.parse.urlencode({
            "path": path,
            "page": page,
            "sort": "createdAt desc"
        })
        res = requests.get(f"{LIST_DIR_URL}?{params}", headers=self._get_cookies_header())

        return cow.CowListDirDocument(**res.json())

    def get_download_link(self, guid: str):
        params = urllib.parse.urlencode({
            "guid": guid
        })
        res = requests.get(f"{DOWNLOAD_ENDPOINT}?{params}", headers=self._get_cookies_header())

        return res.json()['downloadLink']

def get_cow() -> CowTransfer:
    key = settings.get_settings(SETTINGS_KEY)
    if key is None:
        key = ''

    cow = CowTransfer(key)

    if not cow.is_login():
        cow.login()

    return cow
