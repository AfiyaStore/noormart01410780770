// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import bcrypt from 'bcryptjs'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { connectToDatabase } from './lib/db'
// import client from './lib/db/client'
// import User from './lib/db/models/user.model'

// import NextAuth, { type DefaultSession } from 'next-auth'
// import authConfig from './auth.config'

// declare module 'next-auth' {
//     // eslint-disable-next-line no-unused-vars
//     interface Session {
//         user: {
//             role: string
//         } & DefaultSession['user']
//     }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//     ...authConfig,
//     pages: {
//         signIn: '/sign-in',
//         newUser: '/sign-up',
//         error: '/sign-in',
//     },
//     session: {
//         strategy: 'jwt',
//         maxAge: 30 * 24 * 60 * 60,
//     },
//     adapter: MongoDBAdapter(client),
//     providers: [
//         CredentialsProvider({
//             credentials: {
//                 email: {
//                     type: 'email',
//                 },
//                 password: { type: 'password' },
//             },
//             async authorize(credentials) {
//                 await connectToDatabase()
//                 if (credentials == null) return null

//                 const user = await User.findOne({ email: credentials.email })

//                 if (user && user.password) {
//                     const isMatch = await bcrypt.compare(
//                         credentials.password as string,
//                         user.password
//                     )
//                     if (isMatch) {
//                         return {
//                             //   id: user._id,
//                             id: user._id.toString(),
//                             name: user.name,
//                             email: user.email,
//                             role: user.role,
//                         }
//                     }
//                 }
//                 return null
//             },
//         }),
//     ],
//     callbacks: {
//         jwt: async ({ token, user, trigger, session }) => {
//             if (user) {
//                 if (!user.name) {
//                     await connectToDatabase()
//                     await User.findByIdAndUpdate(user.id, {
//                         name: user.name || user.email!.split('@')[0],
//                         role: 'user',
//                     })
//                 }
//                 token.name = user.name || user.email!.split('@')[0]
//                 token.role = (user as { role: string }).role
//             }

//             if (session?.user?.name && trigger === 'update') {
//                 token.name = session.user.name
//             }
//             return token
//         },
//         session: async ({ session, user, trigger, token }) => {
//             session.user.id = token.sub as string
//             session.user.role = token.role as string
//             session.user.name = token.name
//             if (trigger === 'update') {
//                 session.user.name = user.name
//             }
//             return session
//         },
//     },
// })
import Google from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from './lib/db'
import client from './lib/db/client'
import User from './lib/db/models/user.model'

import NextAuth, { type DefaultSession } from 'next-auth'
import authConfig from './auth.config'

/* ================== SESSION TYPE EXTEND ================== */
declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            role: string
        } & DefaultSession['user']
    }
}

/* ================== NEXT AUTH ================== */
export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,

    pages: {
        signIn: '/sign-in',
        newUser: '/sign-up',
        error: '/sign-in',
    },

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },

    adapter: MongoDBAdapter(client),

    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },

            async authorize(credentials) {
                await connectToDatabase()
                if (!credentials) return null

                // ✅ TYPE FIX (logic unchanged)
                const { email, password } = credentials as {
                    email: string
                    password: string
                }

                const user = await User.findOne({ email })

                if (user && user.password) {
                    const isMatch = await bcrypt.compare(password, user.password)

                    if (isMatch) {
                        return {
                            id: user._id.toString(), // ✅ ObjectId → string
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        }
                    }
                }

                return null
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                await connectToDatabase()

                if (!user.name) {
                    await User.findByIdAndUpdate(user.id, {
                        name: user.email!.split('@')[0],
                        role: 'User',
                    })
                }

                token.name = user.name || user.email!.split('@')[0]
                token.role = (user as { role: string }).role
            }

            if (trigger === 'update' && session?.user?.name) {
                token.name = session.user.name
            }

            return token
        },

        async session({ session, token, user, trigger }) {
            session.user.id = token.sub as string
            session.user.role = token.role as string
            session.user.name = token.name as string

            if (trigger === 'update' && user?.name) {
                session.user.name = user.name
            }

            return session
        },
    },
})
