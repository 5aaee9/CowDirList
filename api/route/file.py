from api.utils.cow import CowTransfer, get_cow
from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
from api.database.services import cache as cacheService
from api.schemas.cow import CowListDirDocument
from typing import Optional

router = APIRouter()

@router.get(
    '/files/list/{path:path}',
    tags=['files'],
    response_model=CowListDirDocument,
    summary="Get path file list")
async def get_file_list(path: Optional[str], page: int = 0, cow: CowTransfer = Depends(get_cow)):
    path = f"/{path}"

    cache_data = cacheService.get_cache(path, page)
    if cache_data is not None:
        return cache_data


    api_data = cow.list_dir(path, page)
    cacheService.create_cache(path, page, api_data)

    return api_data


@router.get(
    '/files/download/{guid}',
    tags=['files'],
    summary="Redirect to file download link"
)
async def download_file(guid: str, cow: CowTransfer = Depends(get_cow)):
    return RedirectResponse(url=cow.get_download_link(guid))
