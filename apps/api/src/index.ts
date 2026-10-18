import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { createLogger } from "@repo/logger";

const logger = createLogger({ name: "api" });

const app = new Hono();

app.get("/", (c) =>
  c.json({
    name: "api",
    status: "ok",
  }),
);

app.get("/health", (c) =>
  c.json({
    status: "ok",
    uptime: process.uptime(),
  }),
);

const echoSchema = z.object({
  message: z.string().min(1),
});

app.post("/echo", zValidator("json", echoSchema), (c) => {
  const { message } = c.req.valid("json");

  logger.info("echo request", { message });

  return c.json({
    message,
    receivedAt: new Date().toISOString(),
  });
});

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  logger.info(`API listening on http://localhost:${info.port}`);
});

export default app;
export type AppType = typeof app;
