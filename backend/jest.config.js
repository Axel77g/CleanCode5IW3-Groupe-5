/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
    "^@application/(.*)$": "<rootDir>/src/application/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@expressApp/(.*)$": "<rootDir>/src/infrastructure/frameworks/express/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};