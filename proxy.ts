// // import NextAuth from 'next-auth'
// // import authConfig from './auth.config'

// // export const { auth: middleware } = NextAuth(authConfig)

// // export const config = {
// //     matcher: [
// //         /*
// //          * Match all request paths except for the ones starting with:
// //          * - api (API routes)
// //          * - _next/static (static files)
// //          * - _next/image (image optimization files)
// //          * - favicon.ico (favicon file)
// //          */
// //         '/((?!api|_next/static|_next/image|favicon.ico).*)',
// //     ],
// // }


// // import { NextRequest, NextResponse } from 'next/server'
// // import { getToken } from 'next-auth/jwt'

// // export async function proxy(req: NextRequest) {
// //     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

// //     // যদি token না থাকে এবং login/signup page এ না থাকে
// //     if (!token && !['/sign-in', '/sign-up'].includes(req.nextUrl.pathname)) {
// //         return NextResponse.redirect(new URL('/sign-in', req.url))
// //     }

// //     return NextResponse.next()
// // }

// // export const config = {
// //     matcher: [
// //         '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
// //     ],
// // }
// // proxy.ts
// // import { NextRequest, NextResponse } from 'next/server'
// // import { getToken } from 'next-auth/jwt'

// // export async function proxy(req: NextRequest) {
// //     const url = req.nextUrl.clone()
// //     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

// //     // Public pages – যেগুলো redirect loop এ না পড়বে
// //     const publicPaths = ['/sign-in', '/sign-up', '/api/auth']

// //     // যদি public page হয় → allow
// //     if (publicPaths.some(path => url.pathname.startsWith(path))) {
// //         return NextResponse.next()
// //     }

// //     // Token না থাকলে → redirect to sign-in page with callbackUrl
// //     if (!token) {
// //         url.pathname = '/sign-in'
// //         url.searchParams.set('callbackUrl', req.nextUrl.pathname) // Save original page
// //         return NextResponse.redirect(url)
// //     }

// //     // Token আছে → allow
// //     return NextResponse.next()
// // }

// // export const config = {
// //     matcher: [
// //         '/((?!api|_next/static|_next/image|favicon.ico).*)',
// //     ],
// // }

// // // proxy.ts
// // import NextAuth from 'next-auth'
// // import authConfig from './auth.config'

// // export const { auth: proxy } = NextAuth(authConfig)

// // export const config = {
// //     matcher: [
// //         '/((?!api|_next/static|_next/image|favicon.ico).*)',
// //     ],
// // }
// import createMiddleware from 'next-intl/middleware'
// import { routing } from './i18n/routing'


// import NextAuth from 'next-auth'
// import authConfig from './auth.config'
// const intlMiddleware = createMiddleware(routing)

// const publicPages = [
//   '/',
//   '/search',
//   '/sign-in',
//   '/sign-up',
//   '/cart',
//   '/cart/(.*)',
//   '/product/(.*)',
//   '/page/(.*)',
//   // (/secret requires auth)
// ]

// const { auth } = NextAuth(authConfig)

// export const proxy = auth

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// }

import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

const publicPages = [
  '/',
  '/search',
  '/sign-in',
  '/sign-up',
  '/cart',
  '/cart/(.*)',
  '/product/(.*)',
  '/page/(.*)',
  // (/secret requires auth)
]

const intlMiddleware = createMiddleware(routing)
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    // return NextResponse.next()
    return intlMiddleware(req)
  } else {
    if (!req.auth) {
      const newUrl = new URL(
        `/sign-in?callbackUrl=${encodeURIComponent(req.nextUrl.pathname) || '/'
        }`,
        req.nextUrl.origin
      )
      return Response.redirect(newUrl)
    } else {
      return intlMiddleware(req)
    }
  }
})