import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

// double check if im using transaction pool
// Disable prefetch as it is not supported for "Transaction" pool mode
// const client = postgres(env.DATABASE_URL, { prepare: false })

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: postgres.Sql | undefined;
// };

// const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });
