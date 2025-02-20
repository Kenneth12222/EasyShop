import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../api/paymentApi"; 
import "../styles/CheckoutForm.css";

const stripePromise = loadStripe(
  "pk_test_51P2AEeP3jLWWEkkLMDg24j89ONmq3R7jBmTqzDwHoZX6kWnTfIVVADnDvxQvkMrKrjFFdxiNvCtODjas9oD5JlY000JBa23LMi"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Additional fields for customer details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let clientSecret;
    try {
      const paymentData = await createPaymentIntent();
      clientSecret = paymentData.clientSecret;
    } catch (error) {
      setPaymentError("Failed to create payment intent.");
      console.error(error);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
            address: {
              line1: address,
              city: city,
              postal_code: zip,
            },
          },
        },
      }
    );

    if (error) {
      setPaymentError(error.message);
      console.error("Payment failed:", error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      console.log("Payment succeeded:", paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>

      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          required
        />
      </div>

      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St"
          required
        />
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Your City"
          required
        />
      </div>

      <div>
        <label>ZIP/Postal Code</label>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="12345"
          required
        />
      </div>

      <div className="card-element-container">
        <label>Card Details</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>

      {paymentError && <div className="error">{paymentError}</div>}
      {paymentSuccess && <div className="success">Payment successful!</div>}
    </form>
  );
};

const StripeCheckout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
