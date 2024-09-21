import { z } from "@hono/zod-openapi";
import config from "../config";

export const passwordSchema = z.string().min(8).max(100);

export const entityTypeSchema = z.enum(config.entityTypes);

export const errorSchema = z.object({
	message: z.string(),
	type: z.string().optional(),
	status: z.number().optional(),
	severity: z.string().optional(),
	entityType: entityTypeSchema.optional(),
	logId: z.string().optional(),
	path: z.string().optional(),
	method: z.string().optional(),
	timestamp: z.string().optional(),
	usr: z.string().optional(),
	org: z.string().optional(),
});

export const failWithErrorSchema = z.object({
	success: z.boolean().default(false),
	error: errorSchema,
});

const offsetRefine = (value: string | undefined) => Number(value) >= 0;
const limitRefine = (value: string | undefined) => Number(value) > 0;

export const paginationQuerySchema = z.object({
	q: z.string().optional(),
	sort: z.enum(["createdAt"]).default("createdAt").optional(),
	order: z.enum(["asc", "desc"]).default("asc").optional(),
	offset: z
		.string()
		.default("0")
		.optional()
		.refine(offsetRefine, "Must be number greater or equal to 0"),
	limit: z
		.string()
		.default("50")
		.optional()
		.refine(limitRefine, "Must be number greater than 0"),
});
