import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '^@themes(.*)$': '<rootDir>/src/common/themes/$1',
    '^@utils(.*)$': ['<rootDir>/src/common/utils/$1'],
    '^@components(.*)$': ['<rootDir>/src/components/$1'],
    '^@features(.*)$': ['<rootDir>/src/features/$1'],
    '^@pages(.*)$': ['<rootDir>/src/pages/$1'],
    '^@hooks(.*)$': ['<rootDir>/src/hooks/$1'],
    '^src(.*)$': ['<rootDir>/src/$1'],
  },
};

export default config;
