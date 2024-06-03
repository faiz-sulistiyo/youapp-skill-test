import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser")?.value;

    // Calculate current time (unix timestamp)
    const currentTime = Math.floor(Date.now() / 1000)

    // User not authenticated when the currentUser cookies is empty or the token already expired
    const isNotAuthenticated = (!currentUser || (currentTime > JSON.parse(currentUser).exp))

    const isProtectedRoutes = !authRoutes.includes(request.nextUrl.pathname);

    // When requested routes is protected route and 
    if (isProtectedRoutes && isNotAuthenticated) {
        request.cookies.delete("currentUser");
        request.cookies.delete("token");

        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("currentUser");
        response.cookies.delete("token");

        return response;
    }

    // Redirect to home page
    if (!isProtectedRoutes && !isNotAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/login", "/register", "/", "/profile"],
  };