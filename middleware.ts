import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { JWT, getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export default  withAuth(
async function middleware(request: NextRequest) {
  
  const pathname = request.nextUrl.pathname;
  const isauthRoute = pathname.startsWith('/admin');
  const response = NextResponse.next();

  if(isauthRoute){
  const Token = await getToken({ req:request, secret });
  const isLoginPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/Dashboard');
  const isAccessingSensitiveRoute = pathname.startsWith('/admin/Dashboard')
    // check if the user is Authenticated
    if (isLoginPage) {
      if (Token) {
        return NextResponse.redirect(new URL('/admin/Dashboard', request.url));
      }
      // rdirect the `Visitor` to The Login Page
      return response;
    }

    if (!Token && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    } 
  }

 }, {
  callbacks: {
    async authorized({ token }: { token: JWT | null }) {
      return true;
    }
  }
})

// specify the path regex to apply the middleware to
export const config = {
    matcher: ['/admin/:path*']
}