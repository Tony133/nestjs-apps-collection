# nestjs-collections-apps 

Collection example apps with NestJS and Typeorm, Mongodb, PostgreSQL, GraphQL, Mercurius, etc. for the NestJS community 😻

## Running all unit tests

```
 $  npx nx affected:test 
```

## Running all end-to-end tests

```
 $  npx nx affected:e2e 
```

## Generate an application

Run `nx g @nrwl/nestjs:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/nestjs:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nestjs-collections-apps/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:3000/. The app will automatically reload if you change any of the source files.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.



## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

---

<p style="text-align: left;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="50"></p>
