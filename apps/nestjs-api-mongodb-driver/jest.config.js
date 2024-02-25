module.exports = {
  displayName: 'nestjs-api-mongodb-driver',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json'}
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nestjs-api-mongodb-driver',
  coveragePathIgnorePatterns: [
    "/entities"
  ],

};
