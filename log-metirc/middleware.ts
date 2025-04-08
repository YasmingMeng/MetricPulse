// import { auth } from './auth';
import { NextResponse } from 'next/server';

export default async function auth(req: { auth: { user: string; }; nextUrl: { pathname: string; }; url: string | URL | undefined; }){
  console.log(req, 'rqeq')
  const isLoggedIn = !!req.auth?.user;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isOnDashboard) {
    if (isLoggedIn) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};