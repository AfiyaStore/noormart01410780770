// import NextAuth from 'next-auth'
// import authConfig from './auth.config'

// export const { auth: middleware } = NextAuth(authConfig)

// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico (favicon file)
//          */
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// }

// import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function proxy(req: NextRequest) {
//     // Token check using NextAuth
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

//     // যদি token না থাকে এবং user login/signup page এ না থাকে
//     if (!token && !req.nextUrl.pathname.startsWith('/auth')) {
//         return NextResponse.redirect(new URL('/auth/sign-in', req.url))
//     }

//     // token থাকলে allow
//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//         // সব route except API, _next/static, _next/image, favicon, login/signup
//         '/((?!api|_next/static|_next/image|favicon.ico|auth/sign-in|auth/sign-up).*)',
//     ],
// }

import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // যদি token না থাকে এবং login/signup page এ না থাকে
    if (!token && !['/sign-in', '/sign-up'].includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
    ],
}
