const { createConnection } = require('../config/rabbitmqConfig');

async function consumeNotificationQueue() {
    const connection = await createConnection();
    const channel = await connection.createChannel();
    const NOTIFICATION_QUEUE = 'NotificationQueue';

    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });
    console.log("Waiting for messages in NotificationQueue...");

    await channel.consume(NOTIFICATION_QUEUE, (msg) => {
        const notificationData = JSON.parse(msg.content.toString());
        console.log(`Notification sent to user: ${notificationData.user}`);
        console.log("Message:", notificationData);

        // Simulate sending email
        console.log("Email sent successfully!");

        channel.ack(msg);
    });
}

module.exports = { consumeNotificationQueue };
