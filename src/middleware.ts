import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = pathname.startsWith("/(public)") || pathname === "/";
  const isPrivatePath = pathname.startsWith("/(private)");
  const normalizedPath = pathname
    .replace("/(public)", "")
    .replace("/(private)", "");

  if (isPrivatePath) {
    const isAuthenticated = true; //checkAuth(request);

    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.rewrite(new URL(normalizedPath || "/", request.url));
  }

  if (isPublicPath) {
    return NextResponse.rewrite(new URL(normalizedPath || "/", request.url));
  }
  return NextResponse.next();
}
function checkAuth(request: NextRequest): boolean {
  // Example: Check for a token in cookies or headers
  const token = request.cookies.get("auth_token")?.value;
  return !!token; // Return true if token exists, false otherwise
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply to all routes except static files and API
  ],
};
