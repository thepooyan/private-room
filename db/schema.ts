import { int, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const deletion_table = sqliteTable("deletion_request", {
  id: int().primaryKey({ autoIncrement: true }).unique(),
  key: text().notNull().unique(),
  phrase: text().notNull(),
  date: integer().notNull(),
});

