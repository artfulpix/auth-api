import { serve } from "@hono/node-server";

import { env } from "../env";
import app from "./server";

const main = async () => {
  serve(
    {
      fetch: app.fetch,
      hostname: "0.0.0.0",
      port: Number(env.PORT),
    },
    (info) => {
      console.info(
        `backend is available on http://${info.address}:${info.port}`
      );
      console.info(`Read the docs on http://${info.address}:${info.port}/docs`);
    }
  );
};

// sdk.start();
main().catch((e) => {
  console.error("Failed to start server");
  console.error(e);
  process.exit(1);
});
