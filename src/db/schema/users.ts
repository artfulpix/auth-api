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
    id: bigint("id", { unsigned: true, mode: "bigint" }).primaryKey(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    unsubscribeToken: varchar("unsubscribe_token", { length: 255 })
      .unique()
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    bio: text("bio"),
    language: mysqlEnum("language", ["en", "fr", "nl"]).default(
      config.defaultLanguage
    ),
    bannerUrl: varchar("banner_url", { length: 255 }),
    thumbnailUrl: varchar("thumbnail_url", { length: 255 }),
    newsletter: boolean("newsletter").notNull().default(false),
    lastSeenAt: timestamp("last_seen_at"), // last time any GET request has been made
    lastVisitAt: timestamp("last_visit_at"), // last time GET me
    lastSignInAt: timestamp("last_sign_in_at"), // last time user went through authentication flow
    createdAt: timestamp("created_at").defaultNow().notNull(),
    modifiedAt: timestamp("modified_at"),
    modifiedBy: bigint("modified_by", { unsigned: true, mode: "bigint" }),
    // role: varchar("role", { enum: roleEnum }).notNull().default("user"),
  },
  (table) => {
    return {
      nameIndex: index("users_name_index").on(table.name),
      unsubscribeTokenIndex: index("users_token_index").on(
        table.unsubscribeToken
      ),
      emailIndex: index("users_email_index").on(table.email),
      createdAtIndex: index("users_created_at_index").on(table.createdAt),
      modifiedByReference: foreignKey({
        columns: [table.modifiedBy],
        foreignColumns: [table.id],
      }),
    };
  }
);

export type UnsafeUserModel = typeof usersTable.$inferSelect;
export type InsertUserModel = typeof usersTable.$inferInsert;
export type UserModel = Omit<
  UnsafeUserModel,
  (typeof config.sensitiveFields)[number]
>;
