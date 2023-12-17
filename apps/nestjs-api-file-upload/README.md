# nestjs-api-file-upload

Simple example file upload with NestJS and TypeORM for the NestJS community 😻

## Installation

```bash
$ npm install
```

## Getting Curl

```bash
  $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/articles  
  $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/articles/:id 
  $ curl -X POST 'http://127.0.0.1:3000/api/articles' -F 'file=@./screenshot.jpg' -F 'title=title #1' -F 'description=description #1'
  $ curl -X PATCH 'http://127.0.0.1:3000/api/articles/1' -F 'file=@./screenshot.jpg' -F 'title=title update #1' -F 'description=description update #1'
  $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/articles/:id 
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Docker

There is a `docker-compose.yml` file for starting MySQL with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`
