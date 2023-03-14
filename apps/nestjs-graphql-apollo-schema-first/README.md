<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# nestjs-graphql-apollo-schema-first

Simple example GraphQL(Schema First) Apollo with NestJS and TypeORM for the NestJS community 😻

## Running the app

```bash
$ npx nx serve nestjs-graphql-apollo-code-first
```

## Set environment

```
$ cp .env.example .env
```

## Test

```bash
# unit tests
$ npx nx test nestjs-graphql-apollo-code-first

# e2e tests
$ npx nx e2e nestjs-graphql-apollo-code-first

# test coverage
$ npx nx test:cov nestjs-graphql-apollo-code-first
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

## getArticle

```
{
    articles {
        id
        title
        description
        users {
            name
        }
    }
}
```

## getArticleById

```
{
    article(id: 1) {
        id
        title
        description
        users {
            name
        }
    }
}

```

## addArticle

```

mutation {
    createArticle(
        createArticleInput: {
            title: "Title #1"
            description: "Lorem ipsum Lorem ipsum #1"
            users: ["tony"]
        }
    ) {
        id
        title
        description
        users {
            name
        }
    }
}

```

## updateArticle

```

mutation {
    updateArticle(
        updateArticleInput: {
            title: "Title Update"
            description: "Lorem ipsum lorem ipsum update"
            users: ["tony"]
        }
        id: 1
    ) {
        title
        description
        users {
            name
        }
    }
}

```

## removeArticle
```
mutation {
    removeArticle(id: 2) {
        title
        description
    }
}
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
        roles: ["ADMIN"]
    }) {
        name
        email
        username
        password
        role {
            name
        }
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
            roles: ["ADMIN]
        }
        id: 1
    ) {
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

## getRoles

```
{
    roles {
        id
        name
    }
}
```

## getRolesById

```
{
    role(id: 1) {
        id
        name
    }
}

```

## addRole

```
mutation {
    createRole(createRoleInput: {
        name: "ADMIN"
    }) {
        id
        name
    }
}
```

## updateRole

```
mutation {
    updateRole(id: 4, updateRoleInput: {
        name: "USER" 
    }) {
        id
        name
    }
}

```

## removeRole

```
mutation {
    removeRole(id: 4) {
        name
    }
}
```