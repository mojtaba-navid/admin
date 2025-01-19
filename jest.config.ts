import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"], // Pointing to your setup file
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest", // Transform TypeScript files
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
};

export default config;
