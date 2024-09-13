import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createEnv } from "@t3-oss/env-core";
import { config as dotenvConfig } from "dotenv";
import { z } from "zod";

// Check if .env file exists
const isEnvFileExists = existsSync(".env");
if (!isEnvFileExists) {
  const isExampleEnvFileExists = existsSync(".env.example");
  if (!isExampleEnvFileExists) {
    throw new Error("Please create a .env file");
  }
  const exampleEnvFile = readFileSync(".env.example");
  writeFileSync(".env", exampleEnvFile);
  console.log("Created .env file");
}
dotenvConfig();

export const env = createEnv({
  server: {
    PORT: z.string().optional(),
    LOGTAIL_TOKEN: z.string().optional(),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.string(),
  },

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
