import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default jestConfig;
