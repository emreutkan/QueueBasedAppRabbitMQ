const express = require('express');
const { sendToPaymentQueue } = require('./queues/paymentQueue');
const { consumePaymentQueue } = require('./services/paymentService');
const { consumeNotificationQueue } = require('./services/notificationService');

const app = express();
app.use(express.json());

app.post('/make-payment', async (req, res) => {
  // console.log("Request URL: /make-payment");
  // console.log("Request Body:", req.body);

  const paymentData = req.body;

  if (!paymentData.user) {
    // console.log("Invalid Payment Data:", paymentData);
    return res.status(400).json({ message: "Invalid payment data" });
  }

  // console.log("Valid Payment Data:", paymentData);
  await sendToPaymentQueue(paymentData);
  res.json({ message: "Payment request sent successfully", data: paymentData });
});


// Start RabbitMQ Consumers
consumePaymentQueue();
consumeNotificationQueue();

// Server Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
