import { createClient } from '@libsql/client';
import { and, eq, gte, lt, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { Shift_Insert, shifts } from './schema';

class Database {
  private static instance: ReturnType<typeof drizzle> | null = null;
  private static initializing: Promise<ReturnType<typeof drizzle>> | null =
    null;

  static async get() {
    if (this.instance) return this.instance;
    if (this.initializing) return this.initializing;

    this.initializing = this.initialize();
    try {
      this.instance = await this.initializing;
      return this.instance;
    } finally {
      this.initializing = null;
    }
  }

  private static async initialize() {
    if (!process.env.DB_FILE_NAME) {
      throw new Error('DB_FILE_NAME is not defined');
    }

    const client = createClient({
      url: process.env.DB_FILE_NAME,
      concurrency: 20,
    });

    const db = drizzle(client);
    await migrate(db, { migrationsFolder: 'drizzle' });
    return db;
  }
}

const getDb = async () => await Database.get();

export const shiftsRepository = {
  async create(shift: Shift_Insert) {
    const db = await getDb();
    const [newShift] = await db.insert(shifts).values(shift).returning();
    return newShift;
  },

  async findAll() {
    const db = await getDb();
    return await db.select().from(shifts).orderBy(shifts.date);
  },

  async findById(id: number) {
    const db = await getDb();
    const results = await db
      .select()
      .from(shifts)
      .where(eq(shifts.id, id))
      .limit(1);
    return results[0];
  },

  async update(id: number, data: Partial<Shift_Insert>) {
    const db = await getDb();
    return await db
      .update(shifts)
      .set(data)
      .where(eq(shifts.id, id))
      .returning();
  },

  async delete(id: number) {
    const db = await getDb();
    return await db.delete(shifts).where(eq(shifts.id, id));
  },

  async getWeeklyStats(startDate: Date, endDate: Date) {
    const db = await getDb();
    const results = await db
      .select({
        totalHours: sql<number>`sum(${shifts.hours})`,
        totalTips: sql<number>`sum(${shifts.tips})`,
        avgTipsPerHour: sql<number>`cast(sum(${shifts.tips}) as float) / sum(${shifts.hours})`,
      })
      .from(shifts)
      .where(and(gte(shifts.date, startDate), lt(shifts.date, endDate)));
    return results[0];
  },
};
