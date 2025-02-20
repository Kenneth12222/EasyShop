import React, { useState } from "react";
import "../styles/Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic (e.g., API call)
    alert(`Thanks for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <section id="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2>Join Our Newsletter</h2>
          <p>
            Stay up-to-date with exclusive offers, new arrivals, and the latest news from our store.
          </p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
