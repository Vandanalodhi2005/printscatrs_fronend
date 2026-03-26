import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/PolicyPages.css';

const RefundReturnPolicy = () => {
    return (
        <div className="policy-page-wrapper">
            <Navbar />
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <p className="last-updated">Site Policy Profile</p>
                    <h1>Refund & Return Policy – Prints Carts</h1>
                    <p className="last-updated">Effective Date: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Your satisfaction is important to us. Prints Carts provides a clear and customer-focused return and refund policy to help you shop confidently. This page outlines eligibility, timelines, and steps for submitting a return.
                    </div>

                    <div className="consent">
                        <strong>Guarantee:</strong> We stand behind the quality of our printers and printing supplies. If you're not completely satisfied with your purchase, we're here to help rectify the situation.
                    </div>

                    <section>
                        <h2>30-Day Return Period</h2>
                        <p>You may request a return for eligible items within 30 days of delivery. Products must be unused, undamaged, and returned in their original packaging with all included accessories. This helps ensure product safety, compatibility, and fair handling for all customers.</p>
                    </section>

                    <section>
                        <h2>1. Return Eligibility</h2>
                        
                        <h3>Eligible Items</h3>
                        <p>The following items are typically eligible for return:</p>
                        <ul>
                            <li>Unopened printers</li>
                            <li>Unopened ink and toner cartridges</li>
                            <li>Printing paper and supplies in sealed, original packaging</li>
                            <li>Items received damaged or defective</li>
                            <li>Products shipped in error</li>
                        </ul>

                        <h3>Not Eligible for Return</h3>
                        <p>Due to safety, hygiene, and industry standards, these items cannot be returned:</p>
                        <ul>
                            <li>Opened or used ink or toner cartridges.</li>
                            <li>Products damaged due to customer handling or improper use.</li>
                            <li>Items without original packaging or missing accessories.</li>
                            <li>Custom or special-order items.</li>
                            <li>Products returned past the 30-day period.</li>
                        </ul>
                        <p className="notice">If you need help determining eligibility, contact us before sending items back.</p>
                    </section>

                    <section>
                        <h2>2. How to Request a Return</h2>
                        
                        <div className="sub-section">
                            <h4>Step 1: Contact Our Support Team</h4>
                            <p>Email us at support@printscarts.com with your order number, product name, and reason for return. Please include photos if the item arrived damaged.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Step 2: Receive RMA & Instructions</h4>
                            <p>If your item qualifies, we will send a Return Merchandise Authorization (RMA) number and detailed packaging instructions.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Step 3: Prepare and Ship</h4>
                            <p>Include the unopened product, all manuals, and accessories. Clearly mark the RMA number on the outer shipping label. Send the package using the provided return label or your preferred carrier.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Step 4: Inspection and Refund</h4>
                            <p>Once we receive and inspect the returned item, we will issue a refund to the original payment method. Refund processing typically takes 3–5 business days.</p>
                        </div>
                    </section>

                    <section>
                        <h2>3. Return Shipping Costs</h2>
                        <div className="sub-section">
                            <h4>Prints Carts Covers Shipping For:</h4>
                            <ul>
                                <li>Damaged or defective items.</li>
                                <li>Items sent in error.</li>
                                <li>Incorrect product shipped.</li>
                            </ul>
                        </div>

                        <div className="sub-section">
                            <h4>Customer Covers Shipping For:</h4>
                            <ul>
                                <li>Change-of-mind returns.</li>
                                <li>Incorrect product ordered by customer.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2>4. Damages and Cancellations</h2>
                        <p>If your item arrives damaged, please contact us within 48 hours. Orders may be canceled before they have shipped. Once shipped, they must follow the standard return process.</p>
                        <p className="important">Notice: Manufacturer warranties apply to eligible products. Prints Carts operates independently and is not an authorized dealer for any manufacturer.</p>
                    </section>

                    <section>
                        <h2>Need Help with a Return?</h2>
                        <p>If you have questions or need assistance, we’re here to help.</p>
                        <p>
                            <strong>Email:</strong> support@printscarts.com<br />
                            <strong>Website:</strong> www.printscarts.com
                        </p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-RP-2026-V1</span>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ background: 'none', border: 'none', color: '#0f3d91', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Back to Top ↑
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundReturnPolicy;

