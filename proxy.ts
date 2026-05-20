import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/notes", "/profile"];
const authRoutes = ["/sign-in", "/sign-up"];

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("connect.sid")?.value;

  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const isAuth = authRoutes.some((r) => pathname.startsWith(r));

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuth && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};