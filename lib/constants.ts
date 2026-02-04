export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'NoorMart'
export const APP_SLOGAN =
    process.env.NEXT_PUBLIC_APP_SLOGAN || 'Spend less, enjoy more.'
export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'NoorMart is a modern, fast, and secure e-commerce platform inspired by Amazon. Built with Next.js and MongoDB, NoorMart delivers a seamless shopping experience with lightning-fast performance, smart search, secure payments, and scalable architecture—designed for the future of online shopping.'
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)
export const FREE_SHIPPING_MIN_PRICE = Number(
    process.env.FREE_SHIPPING_MIN_PRICE || 35
)
export const APP_COPYRIGHT =
    process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
    `Copyright © 2025 ${APP_NAME}. All rights reserved.`