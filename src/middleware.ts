import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const publicRoutes = [
  { path: "/auth/login", whenAuthenticated: "redirect" },
  { path: "/auth/register", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
] as const;

const redirect_when_not_authenticated = "/auth/login";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const token = checkAuth(request);

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = redirect_when_not_authenticated;

    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
function checkAuth(request: NextRequest): boolean {
  const token = request.cookies.get("access_token")?.value;
  return !!token;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
