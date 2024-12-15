const { createConnection } = require('../config/rabbitmqConfig');

async function sendToNotificationQueue(notificationData) {
    const connection = await createConnection();
    const channel = await connection.createChannel();
    const NOTIFICATION_QUEUE = 'NotificationQueue';

    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });
    channel.sendToQueue(NOTIFICATION_QUEUE, Buffer.from(JSON.stringify(notificationData)));
    console.log("Sent to NotificationQueue:", notificationData);

    setTimeout(() => {
        connection.close();
    }, 1000);
}

module.exports = { sendToNotificationQueue };
