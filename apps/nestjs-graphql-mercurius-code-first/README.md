<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# nestjs-graphql-mercurius-code-first

Simple example GraphQL(Code First) Mercurius with NestJS and TypeORM for the NestJS community 😻

## Running the app

```bash
$ npx nx serve nestjs-graphql-mercurius-code-first
```

## Set environment

```
$ cp .env.example .env
```

## Test

```bash
# unit tests
$ npx nx test nestjs-graphql-mercurius-code-first

# e2e tests
$ npx nx test:e2e nestjs-graphql-mercurius-code-first

# test coverage
$ npx nx test:cov nestjs-graphql-mercurius-code-first
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
    user(id: "1") {
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
        id: "1"
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
    removeUser(id: "3") {
        name
        email
        username
        password
    }
}
```
