module.exports = {
  displayName: 'nestjs-file-upload-multer-express',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json'}
    ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nestjs-file-upload-multer-express',
  coveragePathIgnorePatterns: [
    "/src/app.service.ts",
    "/src/app.resolver.ts"
  ],
};
