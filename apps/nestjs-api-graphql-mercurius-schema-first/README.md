<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# nestjs-api-graphql-mercurius-schema-first

Simple example GraphQL(Schema First) Mercurius with NestJS and TypeORM for the NestJS community 😻

## Running the app

```bash
$ npx nx serve nestjs-api-graphql-mercurius-schema-first
```

## Test

```bash
# unit tests
$ npx nx test nestjs-api-graphql-mercurius-schema-first

# e2e tests
$ npx nx test:e2e nestjs-api-graphql-mercurius-schema-first

# test coverage
$ npx nx test:cov nestjs-api-graphql-mercurius-schema-first
```

## Docker

There is a `docker-compose.yml` file for starting PostgreSQL with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Url GraphiQL

```
 http://localhost:3000/graphiql
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