import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components'

import { formatCurrency, formatDateTime } from '@/lib/utils'
import { IOrder } from '@/lib/db/models/order.model'
import { SERVER_URL } from '@/lib/constants'

export default function OrderPlacedEmail({ order }: { order: IOrder }) {
    return (
        <Html>
            <Preview>Your order has been placed</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Order Confirmed 🎉</Heading>

                        <Text>
                            Hi {order.shippingAddress.fullName},
                            <br />
                            We’ve received your order successfully.
                        </Text>

                        <Section className="my-4">
                            <Row>
                                <Column>
                                    <Text className="text-gray-500">Order ID</Text>
                                    <Text>{order._id.toString()}</Text>
                                </Column>
                                <Column>
                                    <Text className="text-gray-500">Payment Method</Text>
                                    <Text>{order.paymentMethod}</Text>
                                </Column>
                            </Row>
                        </Section>

                        <Section className="border rounded-lg p-4">
                            {order.items.map((item) => (
                                <Row key={item.product} className="mt-4">
                                    <Column className="w-16">
                                        <Img
                                            width="60"
                                            src={
                                                item.image.startsWith('/')
                                                    ? `${SERVER_URL}${item.image}`
                                                    : item.image
                                            }
                                            alt={item.name}
                                            className="rounded"
                                        />
                                    </Column>
                                    <Column>
                                        <Text>{item.name} × {item.quantity}</Text>
                                    </Column>
                                    <Column align="right">
                                        <Text>{formatCurrency(item.price)}</Text>
                                    </Column>
                                </Row>
                            ))}
                        </Section>

                        <Section className="mt-4">
                            <Row>
                                <Column align="right">Total:</Column>
                                <Column align="right">
                                    <Text className="font-bold">
                                        {formatCurrency(order.totalPrice)}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Text className="text-sm text-gray-600 mt-4">
                            💡 Payment Status: <b>{order.isPaid ? 'Paid' : 'Pending'}</b>
                            <br />
                            We’ll notify you once payment is completed.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
