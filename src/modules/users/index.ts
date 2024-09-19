import { CustomHono } from "../../common/types";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema/users";
import { hashPasswordWithArgon } from "../../lib/argon2id";

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
  .openapi(usersRoutesConfig.createUsers, async (ctx) => {
    const { email, password, username } = await ctx.req.json();
    const hashedPassword = await hashPasswordWithArgon(password);

    try {
      await db.insert(usersTable).values({
        email,
        username,
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
