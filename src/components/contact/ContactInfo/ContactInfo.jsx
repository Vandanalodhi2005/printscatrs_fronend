import React from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
    return (
        <div className="contact-info-container">
            <div className="info-card">
                <h2>📍 Mailing Address</h2>
                <div className="info-content-standalone">
                    <p>Prints Carts</p>
                    <p>7181 Beacon Dr 15</p>
                    <p>Reno, NV 89506</p>
                    <p>United States</p>
                </div>
            </div>

            <div className="info-card">
                <h2>📧 Email Support</h2>
                <div className="info-content-standalone">
                    <p className="highlight-text">For all inquiries, please contact us at:</p>
                    <p className="email-link">support@printscarts.com</p>
                    <p className="sub-text">We aim to reply promptly during business hours.</p>
                </div>
            </div>

            <div className="info-card">
                <h2>🌐 Website</h2>
                <div className="info-content-standalone">
                    <p className="email-link">www.printscarts.com</p>
                    <p className="sub-text">Browse our products, view compatibility details, or learn more about our services.</p>
                </div>
            </div>

            <div className="info-card">
                <h2>💬 What We Can Help With</h2>
                <div className="info-content-standalone">
                    <p className="sub-text">Our customer assistance team can support you with:</p>
                    <ul className="help-list-new">
                        <li>Product inquiries and compatibility questions</li>
                        <li>Order updates and shipping status</li>
                        <li>Return and refund guidance</li>
                        <li>Basic questions about using our website and services</li>
                    </ul>
                </div>
            </div>

            <div className="info-card response-card">
                <h2>🕒 Response Time</h2>
                <div className="info-content-standalone">
                    <p>Most messages receive a response within a reasonable timeframe during standard business hours. Response times may vary on weekends or holidays.</p>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
