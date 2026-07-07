import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const VALID_ROLES = ["admin", "teacher", "student"] as const;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const attemptedRole = segments[1];

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginRole = (VALID_ROLES as readonly string[]).includes(attemptedRole)
      ? attemptedRole
      : "student";
    const url = req.nextUrl.clone();
    url.pathname = `/login/${loginRole}`;
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const isSharedSection = attemptedRole === "profile" || attemptedRole === "settings";
  if (!isSharedSection && token.role && attemptedRole !== token.role) {
    const url = req.nextUrl.clone();
    url.pathname = `/dashboard/${token.role}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
