// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { createPaymentIntent } from '../api/api';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentError, setPaymentError] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsProcessing(true);
//     setPaymentError(null);
    
//     let clientSecret;
//     try {
//       const { data } = await createPaymentIntent();
//       clientSecret = data.clientSecret;
//     } catch (error) {
//       setPaymentError('Failed to create payment intent.');
//       console.error(error);
//       setIsProcessing(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: { name: 'Customer Name' } // You can collect the name dynamically if needed
//       },
//     });

//     if (error) {
//       setPaymentError(error.message);
//       console.error('Payment failed:', error);
//     } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//       setPaymentSuccess(true);
//       console.log('Payment succeeded:', paymentIntent);
//     }
//     setIsProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement options={{ hidePostalCode: true }} />
//       <button type="submit" disabled={!stripe || isProcessing}>
//         {isProcessing ? 'Processing...' : 'Pay Now'}
//       </button>
//       {paymentError && <div className="error">{paymentError}</div>}
//       {paymentSuccess && <div className="success">Payment successful!</div>}
//     </form>
//   );
// };

// export default PaymentForm;
