import { CustomHono } from "../../common/types";
import { db } from "../../db/db";
import { safeUserSelect, usersTable } from "../../db/schema/users";
import { hashPasswordWithArgon } from "../../lib/argon2id";
import { UserDataAccess } from "./data-access";

import usersRoutesConfig from "./routes";

const app = new CustomHono();
const dataAccess = new UserDataAccess(db, usersTable);

// Users endpoints
const usersRoutes = app
  /*
   * Get list of users
   */
  .openapi(usersRoutesConfig.getUsers, async (ctx) => {
    const { data, total } = await dataAccess.findAll({
      columns: safeUserSelect,
    });

    return ctx.json(
      {
        success: true,
        data: { items: [...(data as [])], total },
      },
      200
    );
  })
  /*
   * Create a user
   */
  .openapi(usersRoutesConfig.createUsers, async (ctx) => {
    const { email, password, username } = await ctx.req.json();
    const hashedPassword = await hashPasswordWithArgon(password);

    try {
      await dataAccess.create({
        username,
        email,
        passwordHash: hashedPassword,
      });

      return ctx.json({ success: true }, 200);
    } catch (error) {
      return ctx.json(
        { success: false, error: (error as any).sqlMessage },
        400
      );
    }
  });

export type AppUsersType = typeof usersRoutes;

export default usersRoutes;
