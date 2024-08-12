import nextJest from 'next/jest'
import type { Config } from 'jest';

const createJestConfig = nextJest({ dir: "./" })

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
