import { CustomHono } from "../../common/types";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema/users";

import usersRoutesConfig from "./routes";

const app = new CustomHono();

// Users endpoints
const usersRoutes = app
  /*
   * Get list of users
   */
  .openapi(usersRoutesConfig.getUsers, async (ctx) => {
    const user = await db
      .select({
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
      })
      .from(usersTable);

    return ctx.json(
      {
        success: true,
        data: { user },
      },
      200
    );
  })
  .openapi(usersRoutesConfig.getUsers, async (ctx) => {
    const user = await db
      .select({
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
      })
      .from(usersTable);

    return ctx.json(
      {
        success: true,
        data: { user },
      },
      200
    );
  });

export type AppUsersType = typeof usersRoutes;

export default usersRoutes;
