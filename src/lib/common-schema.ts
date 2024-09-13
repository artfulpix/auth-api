import { z } from "zod";
import config from "../config";

export const entityTypeSchema = z.enum(config.entityTypes);

export const errorSchema = z.object({
  message: z.string(),
  type: z.string(),
  status: z.number(),
  severity: z.string(),
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
