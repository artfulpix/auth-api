import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { passwordSchema } from "../../lib/common-schema";
import { usersTable } from "../../db/schema/users";
import config from "../../config";

export const userCreateSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: passwordSchema,
});

export const userSchema = createSelectSchema(usersTable, {
  id: z.bigint(),
  createdAt: z.date(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  status: z.enum(config.userStatus as [string]),
  username: z.string(),
}).omit({
  passwordHash: true,
});
