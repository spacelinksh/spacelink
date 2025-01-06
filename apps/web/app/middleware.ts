import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAuth } from "@/hooks/use-auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token");

  if (token) {
    const auth = useAuth.getState();
    await auth.refreshUser();
  }

  if (!token && req.nextUrl.pathname.startsWith("/app")) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && req.nextUrl.pathname === "/auth/login") {
    const appUrl = new URL("/app", req.url);
    return NextResponse.redirect(appUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/app", "/login"],
};
