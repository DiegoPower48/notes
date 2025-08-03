import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const isAuthenticated = !!token;

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/";
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isDashboardRoute = pathname.startsWith("/dashboard");
  if (isDashboardRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
