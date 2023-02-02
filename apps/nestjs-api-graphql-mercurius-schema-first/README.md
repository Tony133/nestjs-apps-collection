# nestjs-api-graphql-mercurius-schema-first

Simple example GraphQL(Schema First) Mercurius with NestJS and TypeORM for the NestJS community 😻

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

There is a `docker-compose.yml` file for starting PostgreSQL with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Url GraphQL Playground

```
 http://localhost:3000/graphql
```

## Generate schema GQL run script on demand

```
    $ ts-node  generate-typings
```

## getUsers

```
{
    users {
        id
        name
        email
        username
        password
        roles {
            name
        }
    }
}

```

## getUserById

```
{
    user(id: 1) {
        id
        name
        email
        username
        password
        roles {
            name
        }
    }
}

```

## addUser

```

mutation {
    createUser(createUserInput: {
        name: "tony"
        email:"tony_admin@nest.it"
        username: "tony_admin"
        password: "secret123"
    }) {
        name
        email
        username
        password
    }
}

```

## updateUser

```
mutation {
    updateUser(
        updateUserInput: {
            name: "tony"
            email: "tony_admin@nest.it"
            username: "tony_admin"
            password: "secret123"
        }
        id: 1
    ) {
        name
        email
        username
        password
    }
}
```

## removeUser

```
mutation {
    removeUser(id: 3) {
        name
        email
        username
        password
    }
}
```