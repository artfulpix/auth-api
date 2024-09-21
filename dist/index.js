// src/index.ts
const import_node_server = require("@hono/node-server");

// env.ts
const import_node_fs = require("node:fs");
const import_env_core = require("@t3-oss/env-core");
const import_dotenv = require("dotenv");
const import_zod = require("zod");
const isEnvFileExists = (0, import_node_fs.existsSync)(".env");
if (!isEnvFileExists) {
	const isExampleEnvFileExists = (0, import_node_fs.existsSync)(".env.example");
	if (!isExampleEnvFileExists) {
		throw new Error("Please create a .env file");
	}
	const exampleEnvFile = (0, import_node_fs.readFileSync)(".env.example");
	(0, import_node_fs.writeFileSync)(".env", exampleEnvFile);
	console.log("Created .env file");
}
(0, import_dotenv.config)();
const env = (0, import_env_core.createEnv)({
	server: {
		PORT: import_zod.z.string().optional(),
		LOGTAIL_TOKEN: import_zod.z.string().optional(),
		DB_HOST: import_zod.z.string(),
		DB_USER: import_zod.z.string(),
		DB_PASSWORD: import_zod.z.string(),
		DB_NAME: import_zod.z.string(),
		DB_PORT: import_zod.z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

// src/common/types.ts
const import_zod_openapi = require("@hono/zod-openapi");
const CustomHono = class extends import_zod_openapi.OpenAPIHono {};

// src/lib/default-hook.ts
const import_zod2 = require("zod");

// src/middlewares/logger/log-event.ts
const import_node = require("@logtail/node");
const logtail = env.LOGTAIL_TOKEN
	? new import_node.Logtail(env.LOGTAIL_TOKEN, {})
	: void 0;
const logEvent = (message, eventData, severity = "info") => {
	if (eventData) {
		console[severity](message, eventData);
		if (logtail) logtail[severity](message, void 0, eventData);
	} else {
		console[severity](message);
		if (logtail) logtail[severity](message);
	}
};

// src/lib/default-hook.ts
const defaultHook = (result, ctx) => {
	if (!result.success && result.error instanceof import_zod2.ZodError) {
		logEvent(
			"Validation error",
			{
				error: result.error.issues[0].message,
				path: result.error.issues[0].path[0],
			},
			"info",
		);
		return ctx.json(
			{ success: false, error: result.error.issues[0].message },
			400,
		);
	}
};
const default_hook_default = defaultHook;

// src/lib/docs.ts
const import_hono_api_reference = require("@scalar/hono-api-reference");

// src/config.ts
const config = {
	mode: "development",
	name: "Cella",
	slug: "cella",
	domain: "cellajs.com",
	frontendUrl: "https://cellajs.com",
	backendUrl: "https://api.cellajs.com",
	backendAuthUrl: "https://api.cellajs.com/auth",
	tusUrl: "https://tus.cellajs.com",
	defaultRedirectPath: "/home",
	firstSignInRedirectPath: "/welcome",
	aboutUrl: "/about",
	statusUrl: "https://status.cellajs.com",
	productionUrl: "https://cellajs.com",
	description:
		"Intuitive TypeScript template to build local-first web apps. Implementation-ready. MIT licensed.",
	keywords:
		"starter kit, fullstack, monorepo, typescript, hono, honojs, drizzle, shadcn, react, postgres, pwa",
	supportEmail: "flip@cellajs.com",
	notificationsEmail: "notifications@cellajs.com",
	senderIsReceiver: false,
	debug: false,
	maintenance: false,
	apiVersion: "v1",
	apiDescription: `
        (ATTENTION: PRERELEASE!) This API documentation is split in modules. Each module relates to a module in the backend codebase. Each module should be at least loosely-coupled, but ideally entirely decoupled. The documentation is based upon zod schemas that are converted to openapi specs using hono middleware: zod-openapi.
  
        API differentiates between two types of resource: entities and resources. Entities are the main data objects, the other tables are secondary. They all have an entity column.
  
        Entities can be split into three categories:
        1) Contextual entities (ie organization, workspace, project)
        2) Product entities (ie task, label)
        3) All entities (ie user, organization, workspace, project, task, label)
  
        - SSE stream is not included in this API documentation
        - API design is flat, not nested`,
	// Payment with Paddle
	// paddleToken: 'live_ba8bb57b62089459e4f4fd1da8c',
	// paddlePriceIds: {
	//   donate: 'pri_01hq8hech7se5y1dw9tnscfzpc',
	// },
	paddleToken: "test_85052d6574ab68d36b341e0afc8",
	paddlePriceIds: {
		donate: "pri_01hq8da4mn9s0z0da7chh0ntb9",
	},
	sentryDsn:
		"https://0f6c6e4d1e825242d9d5b0b73faa97fa@o4506897995399168.ingest.us.sentry.io/4506898171559936",
	sentSentrySourceMaps: true,
	// Customer support with Gleap
	gleapToken: "1ZoAxCRA83h5pj7qtRSvuz7rNNN9iXDd",
	// Google maps key
	googleMapsKey: "AIzaSyDMjCpQusdoPWLeD7jxkqAxVgJ8s5xJ3Co",
	// File handling with imado
	tusPort: 1080,
	s3UploadBucket: "cella-uploads",
	s3UploadRegion: "eu-west-1",
	privateCDNUrl: "https://cdn-priv.cellajs.com",
	publicCDNUrl: "https://cdn.cellajs.com",
	// Theme settings
	theme: {
		dark: { primary: "#26262b" },
		rose: { primary: "#e11d48" },
		colorDarkBackground: "hsl(240 10% 9%)",
		strokeWidth: 1.5,
		screenSizes: {
			xs: "420px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1400px",
		},
	},
	// Placeholder colors
	placeholderColors: [
		"bg-blue-300",
		"bg-lime-300",
		"bg-orange-300",
		"bg-yellow-300",
		"bg-green-300",
		"bg-teal-300",
		"bg-indigo-300",
		"bg-purple-300",
		"bg-pink-300",
		"bg-red-300",
	],
	sensitiveFields: ["hashedPassword", "unsubscribeToken"],
	// OAuth providers
	oauthProviderOptions: ["github", "google", "microsoft"],
	enabledOauthProviders: ["github"],
	// Optional settings
	has: {
		pwa: true,
		// Progressive Web App support for preloading static assets and offline support
		signUp: true,
		// Allow users to sign up. If disabled, the app is by invitation only
		waitList: false,
		// Suggest a waitlist for unknown emails when sign up is disabled
	},
	// Languages
	defaultLanguage: "en",
	languages: [
		{ value: "en", label: "English" },
		{ value: "nl", label: "Nederlands" },
	],
	// All entity types
	entityTypes: [
		"user",
		"organization",
		"workspace",
		"project",
		"task",
		"label",
	],
	// Page entity types (pages with memberships and users)
	pageEntityTypes: ["user", "organization", "workspace", "project"],
	// Context entity types (memberships)
	contextEntityTypes: ["organization", "workspace", "project"],
	// Product entity types (no memberships)
	productEntityTypes: ["task", "label"],
	rolesByType: {
		systemRoles: ["user", "admin"],
		entityRoles: ["member", "admin"],
		allRoles: ["user", "member", "admin"],
	},
	// Company details
	company: {
		name: "CellaJS",
		shortName: "Cella",
		email: "info@cellajs.com",
		postcode: "90210 JS",
		tel: "+31 6 12345678",
		streetAddress: "Drizzle Road 42",
		city: "Hono City",
		country: "TypeScript Rock",
		googleMapsUrl: "https://goo.gl/maps/SQlrh",
		scheduleCallUrl: "https://cal.com/flip-van-haaren",
		twitterUrl: "https://twitter.com/flipvanhaaren",
		twitterHandle: "@flipvanhaaren",
		githubUrl: "https://github.com/cellajs/cella",
		mapZoom: 4,
		coordinates: {
			lat: 51.92760809717153,
			lng: 4.47421039909924,
		},
	},
	// Common countries
	common: {
		countries: ["fr", "de", "nl", "ua", "us", "gb"],
		timezones: [],
	},
};
const config_default = config;

// src/routes.ts
const appModulesList = [
	{
		name: "workspaces",
		description:
			"App-specific context entity. Workspace functions for end-users to personalize how they interact with their projects and the content in each project. Only the creator has access and no other members are possible.",
	},
	{
		name: "projects",
		description:
			"App-specific context entity. Projects - like organizations - can have multiple members and are the primary entity in relation to the content-related resources: tasks, labels and attachments. Because a project can be in multiple workspaces, a relations table is maintained.",
	},
	{
		name: "tasks",
		description:
			"App-specific product entity. Tasks are added to a project and can also contain subtasks.",
	},
	{
		name: "labels",
		description:
			"App-specific product entity. Labels are given to tasks and are listed as part of on or more projects.",
	},
];

// src/lib/docs.ts
const commonModulesList = [
	{
		name: "me",
		description:
			"Current user endpoints. They are split from `users` due to a different authorization flow.",
	},
	{
		name: "users",
		description: "`user` is also an entity, but NOT a contextual entity.",
	},
	{
		name: "memberships",
		description:
			"Memberships are one-on-one relations between a user and a contextual entity, such as an organization. It contains a role and archived, muted status",
	},
	{
		name: "organizations",
		description:
			"Organizations - `organization` - are obviously a central `entity`.",
	},
	{
		name: "requests",
		description:
			"Receive public requests such as contact form, newsletter and waitlist requests.",
	},
	{
		name: "general",
		description:
			"Endpoints that overlap multiple entities or are meant to support the system in general.",
	},
	{
		name: "auth",
		description:
			"Multiple authentication methods are included: email/password combination, OAuth with Github. Other Oauth providers and passkey support are work in progress.",
	},
];
const docs = (app4) => {
	const registry = app4.openAPIRegistry;
	registry.registerComponent("securitySchemes", "cookieAuth", {
		type: "apiKey",
		in: "cookie",
		name: `${config_default.slug}-session-${config_default.apiVersion}`,
		description:
			"Authentication cookie. Copy the cookie from your network tab and paste it here. If you don't have it, you need to sign in or sign up first.",
	});
	const tags = commonModulesList.concat(appModulesList);
	app4.doc31("/openapi.json", {
		servers: [{ url: config_default.backendUrl }],
		info: {
			title: `${config_default.name} API`,
			version: config_default.apiVersion,
			description: config_default.apiDescription,
		},
		openapi: "3.1.0",
		tags,
		security: [{ cookieAuth: [] }],
	});
	app4.get(
		"/docs",
		(0, import_hono_api_reference.apiReference)({
			defaultHttpClient: {
				targetKey: "node",
				clientKey: "axios",
			},
			spec: {
				url: "openapi.json",
			},
		}),
	);
};
const docs_default = docs;

// src/middlewares/index.ts
const import_secure_headers = require("hono/secure-headers");

// src/lib/nanoid.ts
const import_nanoid = require("nanoid");
const nanoid = (0, import_nanoid.customAlphabet)(
	"abcdefghijklmnopqrstuvwxyz0123456789",
);

// src/middlewares/logger/logger.ts
const humanize = (times) => {
	const [delimiter, separator] = [",", "."];
	const orderTimes = times.map((v) =>
		v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${delimiter}`),
	);
	return orderTimes.join(separator);
};
const time = (start) => {
	const delta = Date.now() - start;
	return humanize([delta < 1e3 ? `${delta}ms` : `${Math.round(delta / 1e3)}s`]);
};
function log(fn, prefix, logId, method, path, status, elapsed, user, org) {
	const out =
		prefix === "req" /* Incoming */
			? `${prefix} ${logId} ${method} ${path}`
			: `${prefix} ${logId} ${method} ${path} ${status} ${elapsed} ${user}@${org}`;
	fn(out);
}
const logger = (fn = console.info) => {
	return async function logger2(c, next) {
		const { method } = c.req;
		const logId = nanoid();
		c.set("logId", logId);
		const stripUrl = c.req.raw.url
			.replace(/(https?:\/\/)?([^\/]+)/, "")
			.slice(0, 150);
		log(fn, "req" /* Incoming */, logId, method, stripUrl);
		const start = Date.now();
		await next();
		const user = c.get("user")?.id || "na";
		const org = c.get("organization")?.id || "na";
		log(
			fn,
			"res" /* Outgoing */,
			logId,
			method,
			stripUrl,
			c.res.status,
			time(start),
			user,
			org,
		);
	};
};

// src/middlewares/index.ts
const import_cors = require("hono/cors");
const app = new CustomHono();
app.use("*", (0, import_secure_headers.secureHeaders)());
app.get("/ping", (c) => c.text("pong"));
app.use("*", logger(logEvent));
const corsOptions = {
	//   origin: config.frontendUrl,
	origin: ["*"],
	credentials: true,
	allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
	allowHeaders: [],
};
app.use("*", (0, import_cors.cors)(corsOptions));
const middlewares_default = app;

// src/modules/me/routes.ts
const import_zod_openapi2 = require("@hono/zod-openapi");
const MeRoutesConfig = class {
	getSelf = (0, import_zod_openapi2.createRoute)({
		method: "get",
		path: "/",
		// guard: isAuthenticated,
		tags: ["me"],
		summary: "Get self",
		description:
			"Get the current user (self). It includes a `counts` object and a list of `sessions`.",
		responses: {
			200: {
				description: "User",
				content: {
					//   "application/json": {
					//     schema: successWithDataSchema(meUserSchema),
					//   },
				},
			},
			//   ...errorResponses,
		},
	});
	//   public updateSelf = createRouteConfig({
	//     method: "put",
	//     path: "/",
	//     guard: isAuthenticated,
	//     tags: ["me"],
	//     summary: "Update self",
	//     description: "Update the current user (self).",
	//     request: {
	//       body: {
	//         content: {
	//           "application/json": {
	//             schema: updateUserBodySchema.omit({
	//               role: true,
	//             }),
	//           },
	//         },
	//       },
	//     },
	//     responses: {
	//       200: {
	//         description: "User",
	//         content: {
	//           "application/json": {
	//             schema: successWithDataSchema(userSchema.extend(signUpInfo.shape)),
	//           },
	//         },
	//       },
	//       ...errorResponses,
	//     },
	//   });
};
const routes_default = new MeRoutesConfig();

// src/modules/me/index.ts
const app2 = new CustomHono();
const meRoutes = app2.openapi(routes_default.getSelf, async (ctx) => {
	return ctx.json(
		{
			success: true,
			data: {},
		},
		200,
	);
});
const me_default = meRoutes;

// src/server.ts
const app3 = new CustomHono({
	defaultHook: default_hook_default,
});
app3.route("", middlewares_default);
docs_default(app3);
app3.route("/me", me_default);
const server_default = app3;

// src/index.ts
const main = async () => {
	(0, import_node_server.serve)(
		{
			fetch: server_default.fetch,
			hostname: "0.0.0.0",
			port: Number(env.PORT),
		},
		(info) => {
			console.info(
				`backend is available on http://${info.address}:${info.port}`,
			);
			console.info(`Read the docs on http://${info.address}:${info.port}/docs`);
		},
	);
};
main().catch((e) => {
	console.error("Failed to start server");
	console.error(e);
	process.exit(1);
});
//# sourceMappingURL=index.js.map
