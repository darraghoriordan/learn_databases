/* eslint-disable unicorn/prefer-module */
const config = {
  cacheDirectory: __dirname + "/.jest_cache",
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testRegex: "(.*.(test|spec)).(jsx?|tsx?|ts?)$",
  moduleFileExtensions: ["ts", "js", "json"],
  setupFilesAfterEnv: ["./src/testing/preRun.ts"],
  collectCoverage: false,
  verbose: true,
};

export default config;
