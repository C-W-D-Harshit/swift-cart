import { Hono } from "hono";
import { handle } from "hono/vercel";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use(poweredBy());
app.use(logger());

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
