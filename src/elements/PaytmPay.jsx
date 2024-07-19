const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_yoPptvw6dEHh0e',
  key_secret: 'lkgRF9PIeSNzCLWAe4d6eQ88',
});

app.post('/create-order', async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount, // Amount in smallest currency unit
      currency: currency,
      receipt: receipt,
      notes: notes,
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
