from http.cookies import SimpleCookie
from typing import Dict

def parse_cookies(value: str) -> Dict[str, str]:
    ret: Dict[str, str] = {}

    for item in value.split(','):
        item = item.strip()
        if not item:
            continue
        if '=' not in item:
            ret[item] = None
            continue
        name, value = item.split('=', 1)
        ret[name] = value.split(';')[0]

    return ret
