import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function middleware(request: NextRequest) {
  // Only run on admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Skip middleware for admin login page
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  const token = request.cookies.get("admin_token")

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  try {
    verify(token.value, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

export const config = {
  matcher: "/admin/:path*",
}

