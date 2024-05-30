import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const protectedRoutes = ["/profile", "/"];
export const authRoutes = ["/login","/register"];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  const currentTime = Math.floor(Date.now() / 1000)
  const isAuthenticated = (!currentUser || (currentTime > JSON.parse(currentUser).exp))

  if (protectedRoutes.includes(request.nextUrl.pathname) && isAuthenticated) {
    request.cookies.delete("currentUser");

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}