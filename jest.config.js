module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["js", "ts"],
  testPathIgnorePatterns: ["/node_modules/"],
};
