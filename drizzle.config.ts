import { defineConfig } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dialect: "mysql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: Number(env.DB_PORT),
  },
});
