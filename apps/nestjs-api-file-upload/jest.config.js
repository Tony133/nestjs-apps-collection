module.exports = {
  displayName: 'nestjs-api-file-upload',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json'}
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nestjs-api-file-upload',
  coveragePathIgnorePatterns: [
    "/src/app.service.ts",
    "/src/app.resolver.ts"
  ],
};
