# nestjs-api-mongodb

Simple example Api rest with NestJS and MongoDB Driver

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

There is a `docker-compose.yml` file for starting MongoDB with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Getting with Curl Users

```bash
  $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users  
  $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users/:id 
  $ curl -H 'content-type: application/json' -v -X POST -d '{"name": "tony", "email": "tony_admin@nest.com", "username":"tony_admin", "password": "secret"}' http://127.0.0.1:3000/api/users
  $ curl -H 'content-type: application/json' -v -X PATCH -d '{"name": "tony", "email": "tony_admin@nest.com", "username":"tony_admin", "password": "secret123"}' http://127.0.0.1:3000/api/users/:id
  $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/users/:id 
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
