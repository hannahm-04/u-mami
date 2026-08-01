import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role;

    // Proteksi rute berdasarkan role
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (path.startsWith("/kasir") && role !== "KASIR") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (path.startsWith("/koki") && role !== "KOKI") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (path.startsWith("/pelayan") && role !== "PELAYAN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (path.startsWith("/pemilik") && role !== "PEMILIK") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    }
  }
);

export const config = {
  matcher: ["/admin/:path*", "/kasir/:path*", "/koki/:path*", "/pelayan/:path*", "/pemilik/:path*"],
};
