# nestjs-api-graphql-code-first

Simple example GraphQL(Code First) with NestJS 7.x and TypeORM 😻

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

## getPost

```
{
    posts {
        id
        title
        description
        users {
            name
        }
    }
}
```

## getPostById

```
{
    post(id: "1") {
        id
        title
        description
        users {
            name
        }
    }
}

```

## addPost

```

mutation {
    createPost(
        createPostInput: {
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

## updatePost

```

mutation {
    updatePost(
        updatePostInput: {
            title: "Title Update"
            description: "Lorem ipsum lorem ipsum update"
            users: ["tony"]
        }
        id: "1"
    ) {
        title
        description
        users {
            name
        }
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
    user(id: "1") {
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
        id: "1"
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
    removeUser(id: "3") {
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
    role(id: "1") {
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

## removeRole

```
mutation {
    removeRole(id: "4") {
        name
    }
}
```
