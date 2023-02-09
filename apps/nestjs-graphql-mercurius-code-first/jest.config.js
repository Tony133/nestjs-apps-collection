module.exports = {
  displayName: 'nestjs-graphql-mercurius-code-first',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [ 
      'ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json'}
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nestjs-graphql-mercurius-code-first',
};
