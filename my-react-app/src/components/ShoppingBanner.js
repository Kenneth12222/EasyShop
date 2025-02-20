import React from "react";
import "../styles/ShoppingBanner.css";

const ShoppingBanner = () => {
    return (
        <section id="shopping-banner">
            <div className="shopping-banner-container">
                <div className="shopping-banner-text">
                    <strong>Lossions</strong>
                    <h3>Robust Formulations for Radiant Skin</h3>
                    <p>
                        Discover the power of our advanced lossions—designed to deliver potent, long-lasting care that elevates your skincare routine.
                    </p>
                    <a href="#">Discover Now</a>
                </div>
                <div className="shopping-banner-img">
                    <img
                        alt="Lossions skincare"
                        src="https://images.pexels.com/photos/6690884/pexels-photo-6690884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                </div>
            </div>
        </section>
    );
};

export default ShoppingBanner;
