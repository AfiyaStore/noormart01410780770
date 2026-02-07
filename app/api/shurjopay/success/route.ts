import { NextRequest, NextResponse } from 'next/server'
import Order from '@/lib/db/models/order.model'
import { sendPurchaseReceipt } from '@/emails'

export async function POST(req: NextRequest) {
    const body = await req.json()

    const { order_id, transaction_status, amount, customer_email } = body

    if (transaction_status !== 'SUCCESS') {
        return NextResponse.json({ message: 'Payment failed' })
    }

    const order = await Order.findById(order_id).populate('user', 'email')
    if (!order) return new NextResponse('Order not found', { status: 404 })

    order.isPaid = true
    order.paidAt = new Date()
    order.paymentResult = {
        id: body.sp_payment_id,
        status: 'COMPLETED',
        email_address: customer_email,
        pricePaid: amount,
    }

    await order.save()
    await sendPurchaseReceipt({ order })

    return NextResponse.redirect(
        new URL(`/account/orders/${order._id}`, req.url)
    )
}
