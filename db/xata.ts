import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const xataClient = new Client({ connectionString: process.env.DATABASE_URL });
await xataClient.connect();
export const db = drizzle(xataClient);

// const tableName = pgTable("tableName", {
//   xata_id: text("xata_id").primaryKey(),
// });

// const record = await db
//   .select()
//   .from(tableName)
//   .where(eq(tableName.xata_id, "rec_xyz"))
//   .execute();
// console.log(record);\