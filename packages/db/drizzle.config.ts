import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import path from 'path';

config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: "postgresql",
  extensionsFilters: ["postgis"],
  out: "./src/migrations",
  schema: "./src/schema/**/*.ts",
});
