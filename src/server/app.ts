import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import productRouter from "./routes/productRoutes";
import categoryRouter from "./routes/categoryRoutes";
import attributesRouter from "./routes/attributeRoutes";

const app = new Hono().basePath("/api");

app.use(cors());
app.use(secureHeaders());
app.use(csrf());
app.use(compress());
app.use(logger());
app.use(poweredBy());
app.use(prettyJSON());

app.get("/", (c) => {
  return c.json({ message: "Hello from the Hono app!" });
});

app.route("/products", productRouter);
app.route("/categories", categoryRouter);
app.route("/attributes", attributesRouter);

export default app;
