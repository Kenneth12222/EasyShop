// src/components/RedirectToCheckout.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_51P2AEeP3jLWWEkkLMDg24j89ONmq3R7jBmTqzDwHoZX6kWnTfIVVADnDvxQvkMrKrjFFdxiNvCtODjas9oD5JlY000JBa23LMi');


const RedirectToCheckout = () => {
  const handleCheckout = async () => {
    try {
      // Call the backend to create a Checkout Session
      const response = await axios.post(
        'http://localhost:5000/create-checkout-session',
        {},
        { withCredentials: true }
      );
      const sessionId = response.data.sessionId;
      
      // Redirect to Stripe's hosted Checkout page
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe redirect error:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

export default RedirectToCheckout;
