from fastapi import FastAPI
from mangum import Mangum
from api.router import router

app = FastAPI(
    title="CowDirList API",
    description="CowTransfer dir listing",
    version="0.0.1"
)


app.include_router(
    router
)

handler = Mangum(app, enable_lifespan=False)
