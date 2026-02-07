import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/models/order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
import { formatId } from '@/lib/utils'
import OrderPlacedEmail from './order-placed'

const resend = new Resend(process.env.RESEND_API_KEY as string)
console.log('RESEND KEY:', process.env.RESEND_API_KEY)


export const sendOrderPlacedEmail = async ({ order }: { order: IOrder }) => {
    await resend.emails.send({
        from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
        to: (order.user as { email: string }).email,
        subject: 'Order Confirmed – We received your order',
        react: <OrderPlacedEmail order={order} />,
    })
}

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
    await resend.emails.send({
        from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
        to: (order.user as { email: string }).email,
        subject: `Order ${formatId(order._id.toString())} Confirmation`,

        // subject: `Order ${formatId(order._id)} Confirmation`,
        react: <PurchaseReceiptEmail order={order} />,
    })
}
