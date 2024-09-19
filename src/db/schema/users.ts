import {
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
  boolean,
  text,
  timestamp,
  index,
  foreignKey,
  bigint,
} from "drizzle-orm/mysql-core";
import config from "../../config";

export const usersTable = mysqlTable(
  "users",
  {
    id: bigint("id", { unsigned: true, mode: "bigint" })
      .primaryKey()
      .autoincrement(),
    username: varchar("username", { length: 50 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    status: mysqlEnum("status", ["inactive", "active", "suspended"]).default(
      "active"
    ),
    createdAt: timestamp("created_at").defaultNow(),
    emailVerified: boolean("email_verified").default(false),
  },
  (table) => {
    return {
      usernameIndex: index("users_username_index").on(table.username),
      emailIndex: index("users_email_index").on(table.email),
      createdAtIndex: index("users_created_at_index").on(table.createdAt),
    };
  }
);

export type UnsafeUserModel = typeof usersTable.$inferSelect;
export type InsertUserModel = typeof usersTable.$inferInsert;
export type UserModel = Omit<
  UnsafeUserModel,
  (typeof config.sensitiveFields)[number]
>;
