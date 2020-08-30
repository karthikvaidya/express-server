# express-server

A Node.js application using [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [postgres](https://www.postgresql.org/) installed.

You need to add `.env` in root of the project repository. This file is git ignored.

#### sample .env file

```
PORT = 5050
APP_ENV = 'dev'
```

```sh
git clone https://github.com/karthikvaidya/express-server.git
cd express-server
npm install
npm start
```

Your app should now be running on [localhost:5050](http://localhost:5050/).

## Documentation

For more information about using APIs use below links

- [Postman documentation](https://documenter.getpostman.com/view/6600185/TVCcXp4h)

## Assumptions Made

Nodejs installed in the system
Postgres database installed in the system
postgres has below requirements:

- database `postgres`
- user `testuser`
- password `test1234`
