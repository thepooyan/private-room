import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './db/migration',
  schema: './db/schema.ts',
  dialect: 'sqlite',
  // dbCredentials: {
  //   url: process.env.DB_FILE_NAME!,
  // },
});

