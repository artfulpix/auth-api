import { OpenAPIHono } from "@hono/zod-openapi";
import type { z } from "zod";

import type { Schema } from "hono";
import type config from "../config";
import type { failWithErrorSchema } from "../lib/common-schema";

export type Entity = (typeof config.entityTypes)[number];

export type ContextEntity = (typeof config.contextEntityTypes)[number];

export type ProductEntity = (typeof config.productEntityTypes)[number];

export type OauthProviderOptions = (typeof config.oauthProviderOptions)[number];

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type ErrorResponse = z.infer<typeof failWithErrorSchema>;

// TODO find a way to make this generic for template, also make name more descriptive/specific. MiddlewareEnv? CommonEnv?
export type Env = {
	Variables: {
		allowedIds: Array<string>;
		disallowedIds: Array<string>;
	};
};

export class CustomHono<
	E extends Env = Env,
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	S extends Schema = {},
	BasePath extends string = "/",
> extends OpenAPIHono<E, S, BasePath> {}
