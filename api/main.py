from fastapi import FastAPI
from mangum import Mangum
from api.router import router
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CowDirList API",
    description="CowTransfer dir listing",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = False,
    allow_methods = ["GET"],
    allow_headers = ["*"])

app.include_router(
    router
)

handler = Mangum(app, enable_lifespan=False)
