import { z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";

import config from "../../config";
import { usersTable } from "../../db/schema/users";
import { passwordSchema } from "../../lib/common-schema";

export const userSchema = createSelectSchema(usersTable, {
	id: z.bigint(),
	createdAt: z.date(),
	email: z.string().email(),
	emailVerified: z.boolean(),
	status: z.enum(config.userStatus as [string]),
	username: z.string().min(3),
}).omit({
	passwordHash: true,
});

export const userCreateSchema = z.object({
	email: userSchema.shape.email,
	username: z.string().min(3),
	password: passwordSchema,
});
