import NextAuth from 'next-auth'
import authConfig from './auth.config'

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}


// import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt' // যদি next-auth ব্যবহার করতে চান

// export async function middleware(req: NextRequest) {
//     // Example: authentication check
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

//     if (!token) {
//         // যদি token না থাকে, login page এ redirect
//         return NextResponse.redirect(new URL('/auth/login', req.url))
//     }

//     // else allow
//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// }

// import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(req: NextRequest) {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

//     // যদি token না থাকে, এবং user already login/signup page এ না থাকে
//     if (!token) {
//         return NextResponse.redirect(new URL('/auth/login', req.url))
//     }

//     // token থাকলে proceed
//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/signup).*)',
//     ],
// }
