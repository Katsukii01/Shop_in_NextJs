// pages/api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe('ur stripe link', {
  apiVersion: '2020-08-27', // Ensure this matches the Stripe API version you're using
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { lineItems } = req.body;
  console.log('Received request:', req.body);
  console.log('Success URL:', 'http://localhost:3000/success');
  console.log('Cancel URL:', 'http://localhost:3000/cancel');
  
  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
