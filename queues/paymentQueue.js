const { createConnection } = require('../config/rabbitmqConfig');

async function sendToPaymentQueue(paymentData) {
    const connection = await createConnection();
    const channel = await connection.createChannel();
    const QUEUE_NAME = 'PaymentQueue';

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(paymentData)));
    console.log("Sent to PaymentQueue:", paymentData);

    setTimeout(() => {
        connection.close();
    }, 1000);
}

module.exports = { sendToPaymentQueue };
