import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

export const db = drizzle(process.env.DATABASE_URL!);
migrate(db, {migrationsFolder: "./db/migration/"});
