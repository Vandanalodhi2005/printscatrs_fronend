import React from 'react';
import './AboutOffers.css';

const AboutOffers = () => {
    return (
        <section className="what-we-offer">
            <div className="offer-container">
                <h2 className="section-title">What We Offer</h2>
                <div className="offer-grid">
                    <div className="offer-card">
                        <div className="offer-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
                            </svg>
                        </div>
                        <h3>A Diverse Selection of Printing Essentials</h3>
                        <p>
                            From compact home-use printers to office-ready machines, and from ink and toner to
                            printer-friendly paper, Prints Carts provides a wide range of products to meet different
                            printing needs.
                        </p>
                    </div>

                    <div className="offer-card">
                        <div className="offer-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                        </div>
                        <h3>Accurate Product Details</h3>
                        <p>
                            We ensure that product descriptions, compatibility information, and specifications are
                            presented clearly. This helps you choose the right items without confusion or uncertainty.
                        </p>
                    </div>

                    <div className="offer-card">
                        <div className="offer-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h3>Convenient & Secure Shopping Experience</h3>
                        <p>
                            Our website is designed for easy browsing, simple checkout, and secure payment processing.
                            We use industry-standard practices to help protect your personal information.
                        </p>
                    </div>

                    <div className="offer-card expert-card">
                        <div className="offer-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h3>Customer-Focused Assistance</h3>
                        <div className="assistance-details">
                            <p>Our support team is available to help with:</p>
                            <ul>
                                <li>Product inquiries</li>
                                <li>Order status updates</li>
                                <li>Basic questions about printing supplies</li>
                            </ul>
                            <p className="assistance-notice">
                                While we do not provide repair, setup, or troubleshooting services, 
                                we are always happy to assist with shopping-related questions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutOffers;
