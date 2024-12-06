// Import the Hono app instance and Vercel edge handler
import app from "@/server/app";
import { handle } from "hono/vercel";

// Specify that this API route runs on Vercel's Node.js runtime
export const runtime = "nodejs";

// Export handlers for different HTTP methods
// These handlers will process incoming requests using the Hono app
export const OPTIONS = handle(app);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
