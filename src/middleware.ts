import { auth } from "@/auth";

export default auth((req) => {
  console.log("Auth middleware");
  // Redirect to login if not authenticated and trying to access private routes (admin)
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.auth &&
    req.auth.user.role !== "ADMIN"
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);

    return Response.redirect(newUrl);
  }
  // Add more private routes
  const privateRoutes = ["/account", "/admin", "/profile"];
  if (
    privateRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !req.auth
  ) {
    const newUrl = new URL("/auth/login", req.nextUrl.origin);
    newUrl.searchParams.set(
      "next",
      req.nextUrl.pathname ? req.nextUrl.pathname + req.nextUrl.search : "/"
    );
    return Response.redirect(newUrl);
  }

  // Redirect to home if authenticated and trying to access auth pages
  if (req.nextUrl.pathname.startsWith("/auth") && req.auth) {
    console.log("Redirecting to /");
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static).*)"],
};
