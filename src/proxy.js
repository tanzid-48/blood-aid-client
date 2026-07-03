import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/admin", "/volunteer"];
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));

  if (!isProtected) return NextResponse.next();

  // Better Auth cookie name check
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  if (!sessionToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/volunteer/:path*"],
};
