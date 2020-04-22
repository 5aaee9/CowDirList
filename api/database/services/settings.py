from api.database.models.settings import SettingsModel
from api.database.schemas import settings as schema
from typing import Optional

def get_settings(req_setting: str) -> Optional[str]:
    try:
        data = SettingsModel.get(SettingsModel.key == req_setting)

        return data.value
    except SettingsModel.DoesNotExist:
        return None

def set_settings(key: str, value: str):
    SettingsModel \
        .insert(key=key, value=value) \
        .on_conflict('replace') \
        .execute()
