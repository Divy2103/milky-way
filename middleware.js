import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req, event) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  console.log(isAuthenticated);

  if (req.nextUrl.pathname.startsWith("/user/sign-in") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/user/sign-in`,
    },
  });

  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/user/sign-in", "/checkout"],
};
