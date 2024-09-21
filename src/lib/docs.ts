import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";
import type { CustomHono } from "../common/types";
import config from "../config";

const commonModulesList = [
	{
		name: "me",
		description:
			"Current user endpoints. They are split from `users` due to a different authorization flow.",
	},
	// {
	//   name: "users",
	//   description: "`user` is also an entity, but NOT a contextual entity.",
	// },
	// {
	//   name: "memberships",
	//   description:
	//     "Memberships are one-on-one relations between a user and a contextual entity, such as an organization. It contains a role and archived, muted status",
	// },
	// {
	//   name: "organizations",
	//   description:
	//     "Organizations - `organization` - are obviously a central `entity`.",
	// },
	// {
	//   name: "requests",
	//   description:
	//     "Receive public requests such as contact form, newsletter and waitlist requests.",
	// },
	// {
	//   name: "general",
	//   description:
	//     "Endpoints that overlap multiple entities or are meant to support the system in general.",
	// },
	// {
	//   name: "auth",
	//   description:
	//     "Multiple authentication methods are included: email/password combination, OAuth with Github. Other Oauth providers and passkey support are work in progress.",
	// },
];

// Generate OpenAPI documentation using hono/zod-openapi and scalar/hono-api-reference
const docs = (app: CustomHono) => {
	const registry = app.openAPIRegistry;

	registry.registerComponent("securitySchemes", "cookieAuth", {
		type: "apiKey",
		in: "cookie",
		name: `${config.slug}-session-${config.apiVersion}`,
		description:
			"Authentication cookie. Copy the cookie from your network tab and paste it here. If you don't have it, you need to sign in or sign up first.",
	});

	const tags = commonModulesList;

	app.get(
		"/docs",
		swaggerUI({
			url: "/doc",
		}),
	);

	app.doc("/doc", {
		servers: [{ url: config.backendUrl }],
		info: {
			title: `${config.name} API`,
			version: config.apiVersion,
			description: config.apiDescription,
		},
		tags,
		openapi: "3.1.0",
	});
};

export default docs;
