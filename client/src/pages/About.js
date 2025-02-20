import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Crafting exceptional experiences for discerning shoppers.</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <h2>Who We Are</h2>
        <p>
        Established with passion and driven by innovation, our journey began with a vision to redefine e-commerce. We believe in quality, trust, and cutting-edge design. Our story is one of dedication, continuous improvement, and an unwavering commitment to our customers.
      </p>
      </section>

      {/* History/Timeline Section */}
      <section className="history-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>2015</h3>
            <p>Founded with a vision to revolutionize e-commerce.</p>
          </div>
          <div className="timeline-item">
            <h3>2018</h3>
            <p>Launched our first product line, receiving rave reviews.</p>
          </div>
          <div className="timeline-item">
            <h3>2022</h3>
            <p>Reached 1 million happy customers worldwide.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://images.pexels.com/photos/1481454/pexels-photo-1481454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Head of Marketing</p>
          </div>
          <div className="team-member">
            <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Team Member 3" />
            <h3>Mike Johnson</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Join Us on Our Journey</h2>
        <p>Explore our products and become part of our story.</p>
        <button className="cta-button">Shop Now</button>
      </section>
    </div>
  );
};

export default About;