import React from 'react'
import "../styles/Hero.css"

function Hero() {
  return (
    <div className="main-content">
      <div className="main-content-text">
        <strong>New Arrivals</strong>
        <h1>Elevate Your Style with Trendsetting Fashion</h1>
        <p>
          Discover our latest collection that seamlessly blends classic elegance with modern design.
          Experience the perfect mix of comfort and style.
        </p>
        <a href="#">Shop Now</a>
      </div>
      <div className="main-content-img">
        <img
          alt="Fashion model showcasing new collection"
          src="https://images.pexels.com/photos/975250/pexels-photo-975250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
    </div>
  )
}

export default Hero
