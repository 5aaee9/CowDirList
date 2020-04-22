from fastapi import APIRouter
from api.route.info import router as info_router

router = APIRouter()

router.include_router(
    info_router
)
