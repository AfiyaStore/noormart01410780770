// // import { Metadata } from 'next'
// // import { auth } from '@/auth'
// // import { redirect } from 'next/navigation'
// // import CheckoutForm from './checkout-form'

// // export const metadata: Metadata = {
// //     title: 'Checkout',
// // }

// // export default async function CheckoutPage() {
// //     const session = await auth()
// //     if (!session?.user) {
// //         redirect('/sign-in?callbackUrl=/checkout')
// //     }
// //     return <CheckoutForm />
// // }
// import { notFound } from 'next/navigation'
// import React from 'react'

// import { auth } from '@/auth'
// import { getOrderById } from '@/lib/actions/order.actions'
// import PaymentForm from './[id]/payment-form'


// import CheckoutForm from './checkout-form'
// import Stripe from 'stripe'

// export const metadata = {
//     title: 'Payment',
// }

// const CheckoutPaymentPage = async (props: {
//     params: Promise<{
//         id: string
//     }>
// }) => {
//     const params = await props.params

//     const { id } = params

//     const order = await getOrderById(id)
//     if (!order) notFound()

//     const session = await auth()

//     let client_secret = null
//     if (order.paymentMethod === 'Stripe' && !order.isPaid) {
//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: Math.round(order.totalPrice * 100),
//             currency: 'USD',
//             metadata: { orderId: order._id.toString() },
//         })
//         client_secret = paymentIntent.client_secret
//     }
//     return (
//         <PaymentForm
//             order={order}
//             paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
//             clientSecret={client_secret}
//             isAdmin={session?.user?.role === 'Admin' || false}
//         />
//     )
// }

// export default CheckoutPaymentPage
import { Metadata } from 'next'
import CheckoutForm from './checkout-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Checkout',
}

export default async function CheckoutPage() {
    const session = await auth()
    if (!session?.user) {
        redirect('/sign-in?callbackUrl=/checkout')
    }
    return <CheckoutForm />
}