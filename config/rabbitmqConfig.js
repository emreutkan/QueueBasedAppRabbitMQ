const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';

async function createConnection() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        console.log("Connected to RabbitMQ");
        return connection;
    } catch (error) {
        console.error("Failed to connect to RabbitMQ", error);
        process.exit(1);
    }
}

module.exports = { createConnection };
