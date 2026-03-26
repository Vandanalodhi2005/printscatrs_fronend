import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/PolicyPages.css';

const ShippingPolicy = () => {
    return (
        <div className="policy-page-wrapper">
            <Navbar />
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <p className="last-updated">Site Policy Profile</p>
                    <h1>Shipping Policy – Prints Carts</h1>
                    <p className="last-updated">Effective Date: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Thank you for shopping with Prints Carts. This Shipping Policy outlines how we process, ship, and deliver orders across the United States and Canada. Our goal is to provide clear information so you know what to expect when placing an order.
                    </div>

                    <div className="consent">
                        <strong>Logistics Commitment:</strong> We work with trusted carriers to ensure your printers and printing supplies arrive safely and efficiently at your doorstep.
                    </div>

                    <section>
                        <h2>1. Shipping Locations</h2>
                        <p>Prints Carts currently ships to:</p>
                        <ul>
                            <li>All U.S. states (continental & non-continental)</li>
                            <li>Canada (excluding remote or restricted regions)</li>
                        </ul>
                        <p className="notice">International Notice: We do not ship internationally outside the United States and Canada at this time.</p>
                    </section>

                    <section>
                        <h2>2. Processing Time</h2>
                        <div className="sub-section">
                            <h4>Order Processing</h4>
                            <p>Orders are typically processed within 1–2 business days. Processing time includes:</p>
                            <ul>
                                <li>Order verification and security checks</li>
                                <li>Professional Packaging</li>
                                <li>Quality & Accuracy Inspections</li>
                                <li>Preparation for carrier pickup</li>
                            </ul>
                        </div>
                        <p>Orders placed on weekends or holidays will be processed on the next business day. Processing times may vary during peak seasons or due to product availability.</p>
                    </section>

                    <section>
                        <h2>3. Delivery Timeframes</h2>
                        <p>Delivery times depend on shipping destination, product availability, and carrier operations. Please note that transit times are estimates and may be affected by weather or transit delays.</p>
                        
                        <div className="sub-section">
                            <h4>Estimated Delivery Windows (U.S.)</h4>
                            <ul>
                                <li><strong>Standard Shipping:</strong> 3–7 business days</li>
                                <li><strong>Expedited Shipping:</strong> 2–4 business days (when offered)</li>
                            </ul>
                        </div>

                        <div className="sub-section">
                            <h4>Estimated Delivery Windows (Canada)</h4>
                            <ul>
                                <li><strong>Standard Shipping:</strong> 5–10 business days</li>
                                <li><strong>Expedited Shipping:</strong> 3–7 business days (when offered)</li>
                            </ul>
                        </div>
                        <p className="notice">Delivery estimates are not guaranteed and may vary based on carrier performance.</p>
                    </section>

                    <section>
                        <h2>4. Shipping Costs</h2>
                        <p>Shipping fees are calculated at checkout and depend on the weight of items, shipping location, and transit speed. Free shipping may be available during promotions; eligibility will be clearly displayed when applicable.</p>
                    </section>

                    <section>
                        <h2>5. Shipping Carriers</h2>
                        <p>We work with reputable carriers to provide the best service possible:</p>
                        <ul>
                            <li>USPS (United States Postal Service)</li>
                            <li>UPS (United Parcel Service)</li>
                            <li>FedEx (Federal Express)</li>
                            <li>Canada Post (for Canadian orders)</li>
                        </ul>
                        <p>Carrier availability may vary by region and product type.</p>
                    </section>

                    <section>
                        <h2>6. Order Tracking</h2>
                        <p>Once your order ships, you will receive an automated email containing your tracking number, carrier name, and a direct link to track your package.</p>
                        <p className="notice">Tracking updates may take up to 24 hours to appear in the carrier's system after pickup.</p>
                    </section>

                    <section>
                        <h2>7. Incorrect or Incomplete Addresses</h2>
                        <p>Please ensure the accuracy of your shipping address before completing checkout. Prints Carts is not responsible for delays caused by incorrect addresses or packages delivered to the wrong location.</p>
                        <p className="important">If a package is returned to us due to an incorrect address provided by the customer, reshipping fees will apply.</p>
                    </section>

                    <section>
                        <h2>8. Delivery Attempts & Lost Packages</h2>
                        <div className="sub-section">
                            <h4>Missed Delivery Attempts</h4>
                            <p>If the carrier is unable to deliver your package, they may attempt a second delivery, leave a pickup notice, or hold the package at a local facility for a limited time.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Lost or Stolen Packages</h4>
                            <p>If your tracking shows “delivered” but you did not receive the package, please check with neighbors or building management. If you still cannot locate your package after 48 hours, contact the carrier directly and notify us for assistance in coordinating an investigation.</p>
                        </div>
                    </section>

                    <section>
                        <h2>9. Out-of-Stock or Partial Shipments</h2>
                        <p>If an item becomes unavailable after your order is placed, we will notify you by email. You may choose a full refund or wait for restocking. In some cases, items in your order may ship separately at no extra cost to you.</p>
                    </section>

                    <section>
                        <h2>10. Damaged Shipments</h2>
                        <p>If your order arrives damaged, please contact our support team within 48 hours. Include photos of the product and packaging along with your order number for a prompt resolution.</p>
                    </section>

                    <section>
                        <h2>11. Customs & Duties (Canada Only)</h2>
                        <p>Canadian orders may be subject to import fees, customs duties, and provincial taxes. These charges are the sole responsibility of the customer and are not included in product or shipping costs.</p>
                    </section>

                    <section>
                        <h2>12. Delivery Restrictions</h2>
                        <p>We cannot ship to P.O. boxes in certain regions, or to addresses flagged as potentially unsafe or unserviceable by our carriers. Some remote locations in Canada may have limited service availability.</p>
                    </section>

                    <section>
                        <h2>13. Questions About Shipping?</h2>
                        <p>If you have questions about your order or need assistance with shipping logistics, our team is here to help:</p>
                        <p>
                            <strong>Email:</strong> support@printscarts.com<br />
                            <strong>Website:</strong> www.printscarts.com
                        </p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-SP-2026-V1</span>
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

export default ShippingPolicy;

