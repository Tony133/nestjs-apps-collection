module.exports = {
  displayName: 'nestjs-graphql-apollo-schema-first',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [ 
      'ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json'}
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nestjs-graphql-apollo-schema-first',
  coveragePathIgnorePatterns: [
    "/src/app.service.ts",
    "/src/app.resolver.ts"
  ],
};
