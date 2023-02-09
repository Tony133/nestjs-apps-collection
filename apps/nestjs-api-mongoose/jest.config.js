module.exports = {
  displayName: 'nestjs-api-mongoose',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [ 
      'ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json'}
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nestjs-api-mongoose',
};
