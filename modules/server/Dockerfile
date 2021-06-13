FROM python:3

WORKDIR /app

RUN apt-get update && apt-get -y install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install

COPY . .

CMD ["pipenv", "run", "flask", "run", "--host", "0.0.0.0"]
