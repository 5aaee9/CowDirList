from fastapi import FastAPI

app = FastAPI(
    title="CowDirList API",
    description="CowTransfer dir listing",
    version="0.0.1"
)


@app.get("/")
async def root():
    return {"message": "Hello World"}
