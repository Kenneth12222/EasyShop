import React from "react";
import "../styles/SupportService.css";

const SupportService = () => {
    return (
        <section id="ecommerce-support">
          <div className="support-overlay">
            <div className="support-content">
              <h2>We're Here for You</h2>
              <p>
                Whether you have questions about your order, need help with returns, or require technical support, our dedicated team is available 24/7 to assist you. Choose your preferred method to get in touch.
              </p>
              <div className="support-options">
                <div className="support-option">
                  <i className="fa fa-comments" aria-hidden="true"></i>
                  <h4>Live Chat</h4>
                  <p>Chat with our experts in real-time for immediate assistance.</p>
                </div>
                <div className="support-option">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <h4>Email Us</h4>
                  <p>Send your queries and receive a prompt reply from our team.</p>
                </div>
                <div className="support-option">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <h4>Call Us</h4>
                  <p>Reach us directly at 1-800-123-4567 for quick support.</p>
                </div>
              </div>
              <a href="mailto:support@ecommerce.com" className="contact-button">
                Get Support Now
              </a>
            </div>
          </div>
        </section>
      );
};

export default SupportService;
