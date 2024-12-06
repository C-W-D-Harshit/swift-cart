import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import productRouter from "./routes/productRoutes";

const app = new Hono().basePath("/api");

app.use(poweredBy());
app.use(logger());

app.get("/", (c) => {
  return c.json({ message: "Hello from the Hono app!" });
});

app.route("/products", productRouter);

export default app;
