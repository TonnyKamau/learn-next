import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = path === "/";
  const isResetPasswordRoute = path === "/resetpassword";
  const isVerifyEmailRoute = path === "/verifyemail";
  const isAuthRoute = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  // Allow access to email verification and forgot password routes regardless of token
  if (isVerifyEmailRoute || isResetPasswordRoute) {
    return NextResponse.next();
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicRoute && !isAuthRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/resetpassword",
  ],
};
