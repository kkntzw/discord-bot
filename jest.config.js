module.exports = {
  preset: 'ts-jest',
  roots: [
    "<rootDir>/src/",
    "<rootDir>/test/"
  ],
  testMatch: [
    "**/test/**/*.[tj]s",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  transform: {
    "^.+\\.[tj]s$": "ts-jest"
  },
  moduleNameMapper: {
    '^commands?/(.*)$': '<rootDir>/src/commands/$1',
    '^enums?/(.*)$': '<rootDir>/src/enums/$1',
    '^features?/(.*)$': '<rootDir>/src/features/$1',
    '^models?/(.*)$': '<rootDir>/src/models/$1',
    '^services?/(.*)$': '<rootDir>/src/services/$1',
    '^test?/(.*)$': '<rootDir>/test/$1',
  }
};
