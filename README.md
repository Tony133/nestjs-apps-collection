# nestjs-api-mongoose

Simple example Api Rest with Nestjs 7.x and Mongoose 😻

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

## Getting with Curl Customers

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/customers  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/customers/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"firstName": "firstName #1", "lastName": "lastName #1", "email": "example@nest.it", "phone": "1234567890", "address": "street 1","description": "Lorem ipsum", "organizations": ":OrganizationId"}' http://127.0.0.1:3000/api/customers 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"firstName": "firstName #1", "lastName": "lastName #1", "email": "example@nest.it", "phone": "1234567890", "address": "street 1","description": "Lorem ipsum", "organizations": ":OrganizationId"}' http://127.0.0.1:3000/api/customers/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/customers/:id 
```

## Getting with Curl Organization

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/organizations  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/organizations/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"name":"Foo bar", "address": "street 1", "description": "lorem ipsum"}' http://127.0.0.1:3000/api/organizations 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"name":"Foo bar", "address": "street 1", "description": "lorem ipsum"}' http://127.0.0.1:3000/api/organizations/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/organizations/:id
```

## Getting Pagination using limit and offset

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/customers?limit=10
```

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/customers?offset=10
```
