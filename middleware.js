// middleware.js
import { NextResponse } from "next/server";

// This middleware runs before requests to admin pages
export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public admin routes (login + logout + api auth routes)
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout") ||
    pathname.startsWith("/_next") || // let Next.js internals through
    pathname.startsWith("/favicon.ico") || // allow favicon
    pathname.startsWith("/public") // allow public assets
  ) {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    const adminCookie = req.cookies.get("admin");

    if (!adminCookie || adminCookie.value !== "true") {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware only to admin paths
export const config = {
  matcher: ["/admin/:path*"],
};
