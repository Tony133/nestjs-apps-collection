<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# nestjs-api-sequelize
Simple example Api Rest with Nestjs and Sequelize for the NestJS community 😻

## Running the app

```bash
$ npx nx serve nestjs-api-sequelize
```

## Test

```bash
# unit tests
$ npx nx test nestjs-api-sequelize

# e2e tests
$ npx nx test:e2e nestjs-api-sequelize

# test coverage
$ npx nx test:cov nestjs-api-sequelize
```

## Set environment

```
$ cp .env.example .env
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
    $ curl -H 'content-type: application/json' -v -X POST -d '{"name": "name#1", "surname": "surname#1", "email": "example@nest.it", "username": "username#1", "password": "master", "roles": "ADMIN"}' http://127.0.0.1:3000/api/users 
    $ curl -H 'content-type: application/json' -v -X PATCH -d '{"name": "name update", "surname": "name update", "email": "example@nest.it", "username": "name update", "password": "master", "roles": "SUPER_ADMIN"}' http://127.0.0.1:3000/api/users/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/users/:id 
```

## Getting with Curl Roles

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/roles  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/roles/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"name": "ADMIN"}' http://127.0.0.1:3000/api/roles 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"name": "SUPER_ADMIN"}' http://127.0.0.1:3000/api/roles/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/roles/:id 
```

## Getting with Curl Posts

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/posts  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/posts/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"title": "title#1", "description": "description#1", "userId": 1}' http://127.0.0.1:3000/api/posts 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"title": "title update", "description": "description update", "userId": 2 }' http://127.0.0.1:3000/api/posts/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/posts/:id 
```
