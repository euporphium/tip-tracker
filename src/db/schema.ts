import { sql } from 'drizzle-orm';
import { check, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

export const shifts = sqliteTable(
  'shifts',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    hours: real('hours').notNull().default(0),
    tips: integer('tips').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [
    check('hours_check', sql`${table.hours} >= 0.5 AND ${table.hours} <= 24`),
    check('tips_check', sql`${table.tips} >= 0`),
  ],
);

export type Shift_Insert = typeof shifts.$inferInsert;

export type Shift = typeof shifts.$inferSelect;
