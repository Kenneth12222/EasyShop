import React from 'react';

const Cancel = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. Please try again or contact support if needed.</p>
      <a href="/">Return to Home</a>
    </div>
  );
};

export default Cancel;
