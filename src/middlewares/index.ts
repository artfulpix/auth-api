import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { CustomHono } from "../common/types";
import { logEvent } from "./logger/log-event";
import { logger } from "./logger/logger";

const app = new CustomHono();

// Secure headers
app.use("*", secureHeaders());

// Get metrics and trace
// app.use("*", observatoryMiddleware);

// Sentry
// app.use("*", sentry({ dsn: config.sentryDsn }));

// Health check for render.com
app.get("/ping", (c) => c.text("pong"));

// Logger
app.use("*", logger(logEvent));

const corsOptions = {
	//   origin: config.frontendUrl,
	origin: ["*"],
	credentials: true,
	allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
	allowHeaders: [],
};

// CORS
app.use("*", cors(corsOptions));

// CSRF protection
// app.use("*", csrf({ origin: config.frontendUrl }));

// Rate limiter
// app.use(
//   "*",
//   rateLimiter(
//     {
//       points: 50,
//       duration: 60 * 60,
//       blockDuration: 60 * 30,
//       keyPrefix: "common_fail",
//     },
//     "fail"
//   )
// );

export default app;
