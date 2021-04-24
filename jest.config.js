const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  coverageDirectory: './artifacts/coverage',
  globals: {
    API_URL: 'asdasd',
    pumaEnv: {},
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  roots: ['<rootDir>/src'],
  // Setup Enzyme
  setupFilesAfterEnv: ['./src/setupEnzyme.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
