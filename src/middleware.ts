import { auth } from "@/auth";

export default auth((req) => {
  // Redirect to login if not authenticated
  if (
    !req.auth &&
    (!req.nextUrl.pathname.startsWith("/auth") ||
      req.nextUrl.pathname.startsWith("/account"))
  ) {
    const newUrl = new URL("/auth/login", req.nextUrl.origin);
    // Add the current path as a query parameter
    newUrl.searchParams.set(
      "next",
      req.nextUrl.pathname ? req.nextUrl.pathname + req.nextUrl.search : "/"
    );
    return Response.redirect(newUrl);
  }

  // Redirect to home if authenticated and trying to access auth pages
  if (req.nextUrl.pathname.startsWith("/auth") && req.auth) {
    console.log("Redirecting to /dashboard");
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && req.nextUrl.pathname.startsWith("/auth")) {
    console.log("Redirecting to /");
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static).*)"],
};