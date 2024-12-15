const { createConnection } = require('../config/rabbitmqConfig');
const { sendToNotificationQueue } = require('../queues/notificationQueue');

async function consumePaymentQueue() {
    const connection = await createConnection();
    const channel = await connection.createChannel();
    const PAYMENT_QUEUE = 'PaymentQueue';

    // await channel.assertQueue(PAYMENT_QUEUE, { durable: true });
    console.log("Waiting for messages in PaymentQueue...");

    await channel.consume(PAYMENT_QUEUE, async (msg) => {
        const paymentData = JSON.parse(msg.content.toString());
        console.log("Processing Payment:", paymentData);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Payment Processed:");

        // Push to Notification Queue
        await sendToNotificationQueue(paymentData);

        channel.ack(msg);
    });
}

module.exports = { consumePaymentQueue };
