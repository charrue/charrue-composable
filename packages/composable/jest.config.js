module.exports = {
  moduleFileExtensions: [
    "js",
    "ts",
    "jsx",
    "tsx",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverage: process.env.COVERAGE === "true",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!<rootDir>/src/__tests__/**/*",
    "!<rootDir>/dist/**/*",
  ],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  testEnvironment: "jsdom",
};
