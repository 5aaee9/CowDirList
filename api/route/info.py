from fastapi import APIRouter, Depends
from api.database.depends import get_db
from api.schemas import cow as cowSchemas
from api.utils.cow import CowTransfer, get_cow

router = APIRouter()

@router.get('/info',
    dependencies=[Depends(get_db)],
    tags=['utils'],
    summary="Get current user info")
async def get_info(cow: CowTransfer = Depends(get_cow),) -> cowSchemas.UserInfoDocument:
    return cow.user_info()
