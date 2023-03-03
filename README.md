<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# nestjs-collections-apps 

Collection example apps with NestJS and Typeorm, Sequelize, Mongodb, PostgreSQL, GraphQL, Mercurius, etc. for the NestJS community 😻

## Install workspace 

```
$ pnpm install
```

## Running a sample app

```bash
$ npx nx serve [name-app] # for example: npx nx serve nestjs-api-mongoose
```

or

```bash
$ nx serve [name-app] # for example: npx nx serve nestjs-api-mongoose
```


## Running all unit tests

```bash
 $  npx nx affected:test 
```

or

```bash
 $  nx affected:test 
```

## Running all end-to-end tests

```bash
 $  npx nx affected:e2e 
```

or

```bash
 $  nx affected:e2e 
```

## Generate an application

Run `npx nx g @nrwl/nest:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `npx nx g @nrwl/nest:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nestjs-collections-apps/mylib`.

## Development server

Run `npx nx serve my-app` for a dev server. Navigate to http://localhost:3000/. The app will automatically reload if you change any of the source files.

## Build

Run `npx nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## License

 [MIT licensed](LICENSE)
