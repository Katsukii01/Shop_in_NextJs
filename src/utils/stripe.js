// utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Replace 'your-public-key' with your actual Stripe public key
const stripePromise = loadStripe("urstripekey");

export { stripePromise };
