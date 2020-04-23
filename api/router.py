from fastapi import APIRouter
from api.route.info import router as info_router
from api.route.file import router as file_router

router = APIRouter()

router.include_router(
    info_router
)

router.include_router(
    file_router
)
