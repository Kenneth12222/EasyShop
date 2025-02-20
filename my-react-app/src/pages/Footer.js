import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>Eshop</h3>
          <p>
            We are committed to providing you with the best online shopping
            experience. Discover quality products, reliable service, and
            unparalleled support.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section support">
          <h3>Customer Service</h3>
          <ul>
            <li>
              <a href="#">Order Tracking</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Shipping Info</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Connect with Us</h3>
          <ul className="social-icons">
            <li>
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
