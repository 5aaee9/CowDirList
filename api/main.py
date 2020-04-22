from fastapi import FastAPI
from api.router import router

app = FastAPI(
    title="CowDirList API",
    description="CowTransfer dir listing",
    version="0.0.1"
)


app.include_router(
    router
)
