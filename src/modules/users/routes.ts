import { createRoute } from "@hono/zod-openapi";
import {
  errorResponses,
  successWithoutDataSchema,
} from "../../lib/common-responses";
import { userCreateSchema } from "./schema";

class UsersRoutesConfig {
  public getUsers = createRoute({
    method: "get",
    path: "/",
    // guard: [isAuthenticated, isSystemAdmin],
    tags: ["users"],
    summary: "Get list of users",
    description: "Get a list of users on system level.",
    request: {
      //   query: usersQuerySchema,
    },
    responses: {
      200: {
        description: "Users",
        content: {
          //   'application/json': {
          //     schema: successWithPaginationSchema(userSchema),
          //   },
        },
      },
      ...errorResponses,
    },
  });

  public createUsers = createRoute({
    method: "post",
    path: "/",
    // guard: [isAuthenticated, isSystemAdmin],
    tags: ["users"],
    summary: "Create a user",
    description: "Create a user in the system.",
    request: {
      //   query: usersQuerySchema,
      body: {
        content: {
          "application/json": { schema: userCreateSchema },
        },
      },
    },
    responses: {
      200: {
        description: "Users",
        content: {
          "application/json": {
            schema: successWithoutDataSchema,
          },
        },
      },
      ...errorResponses,
    },
  });
}

export default new UsersRoutesConfig();
