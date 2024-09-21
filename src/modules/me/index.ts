import { CustomHono } from "../../common/types";

import meRoutesConfig from "./routes";

const app = new CustomHono();

// Me (self) endpoints
const meRoutes = app
	/*
	 * Get current user
	 */
	.openapi(meRoutesConfig.getSelf, async (ctx) => {
		return ctx.json(
			{
				success: true,
				data: {},
			},
			200,
		);
	});

export type AppMeType = typeof meRoutes;

export default meRoutes;
