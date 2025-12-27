import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Nếu route không phải /admin → next
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  if (pathname === "/admin/login") return NextResponse.next();

  // Lấy token NextAuth
  const token = await getToken({ req, secret: SECRET });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url); // redirect server-side
  }

  return NextResponse.next(); // có token → cho phép
}

export const config = {
  matcher: ["/admin/:path*"],
};
