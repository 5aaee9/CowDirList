FROM python:alpine-3.8

# Install pipenv
RUN pip install pipenv
COPY Pipfile* /app

# Make requirements
RUN cd /app && pipenv lock --requirements > requirements.txt
RUN pip install -r /app/requirements.txt

COPY api /app/alpine
WORKDIR /app

ENTRYPOINT uvicorn
CMD api.main:app
