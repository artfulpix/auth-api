import { createRoute } from "@hono/zod-openapi";
import { errorResponses } from "../../lib/common-responses";

class MeRoutesConfig {
  public getSelf = createRoute({
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
      ...errorResponses,
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
}
export default new MeRoutesConfig();
