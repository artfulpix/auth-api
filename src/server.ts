import { CustomHono } from "./common/types";
import defaultHook from "./lib/default-hook";
import docs from "./lib/docs";
import middlewares from "./middlewares";
import meRoutes from "./modules/me";
import usersRoutes from "./modules/users";

// import docs from "./lib/docs";
// import { errorResponse } from "./lib/errors";
// import middlewares from "./middlewares";

// Set default hook to catch validation errors
const app = new CustomHono({
  defaultHook,
});

// Add global middleware
app.route("", middlewares);

// Init OpenAPI docs
docs(app);

// Not found handler
// app.notFound((ctx) => {
//   // t('common:error.route_not_found.text')
//   return errorResponse(ctx, 404, "route_not_found", "warn", undefined, {
//     path: ctx.req.path,
//   });
// });

// Error handler
// app.onError((err, ctx) => {
//   // t('common:error.server_error.text')
//   return errorResponse(ctx, 500, "server_error", "error", undefined, {}, err);
// });

// Add routes for each module
app.route("/me", meRoutes).route("/users", usersRoutes);

export default app;
