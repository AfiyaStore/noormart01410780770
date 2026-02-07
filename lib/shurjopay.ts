const BASE_URL =
    process.env.SHURJOPAY_ENV === 'live'
        ? 'https://engine.shurjopay.com'
        : 'https://sandbox.shurjopay.com'

export async function createShurjoPaySession(order: {
    orderId: string
    amount: number
    customerName: string
    customerPhone: string
    customerEmail: string
}) {
    const res = await fetch(`${BASE_URL}/api/checkout/init`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: process.env.SHURJOPAY_USERNAME,
            password: process.env.SHURJOPAY_PASSWORD,
            prefix: process.env.SHURJOPAY_PREFIX,
            return_url: process.env.SHURJOPAY_RETURN_URL,
            cancel_url: process.env.SHURJOPAY_CANCEL_URL,
            order_id: order.orderId,
            amount: order.amount,
            currency: 'BDT',
            customer_name: order.customerName,
            customer_phone: order.customerPhone,
            customer_email: order.customerEmail,
        }),
    })

    if (!res.ok) throw new Error('ShurjoPay init failed')
    return res.json()
}
