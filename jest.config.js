module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^va/(.*)$': '<rootDir>/src/$1',
  },
};
