# nestjs-file-upload-multer-express

Simple example file upload with NestJS, Multer and TypeORM for the NestJS community 😻

## Running the app

```bash
# development
$ npx nx serve nestjs-file-upload-multer-express
```

## Set environment

```
cp .env.example .env
```

## Test

```bash
# unit tests
$ npx nx test nestjs-file-upload-multer-express

# e2e tests
$ npx nx e2e nestjs-file-upload-multer-express

# test coverage
$ npx nx test:cov nestjs-file-upload-multer-express
```

## Docker

There is a `docker-compose.yml` file for starting MySQL with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Getting Curl

```bash
  curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/articles  
  curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/articles/:id 
  curl -X POST 'http://127.0.0.1:3000/api/articles' -F 'file=@./screenshot.jpg' -F 'title=title #1' -F 'description=description #1'
  curl -X PATCH 'http://127.0.0.1:3000/api/articles/1' -F 'file=@./screenshot.jpg' -F 'title=title update #1' -F 'description=description update #1'
  curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/articles/:id 
```
