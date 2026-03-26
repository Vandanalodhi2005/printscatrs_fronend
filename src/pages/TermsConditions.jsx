import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/PolicyPages.css';

const TermsConditions = () => {
    return (
        <div className="policy-page-wrapper">
            <Navbar />
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <p className="last-updated">Site Policy Profile</p>
                    <h1>Terms & Conditions – Prints Carts</h1>
                    <p className="last-updated">Effective Date: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Please read these Terms & Conditions carefully. By accessing or using www.printscarts.com (“Website”), you agree to be bound by the terms outlined below. If you do not agree to these Terms & Conditions, you should discontinue use of our website.
                    </div>
                    <div className="consent">
                         <strong>Compliance Notice:</strong> These Terms govern your use of our website, purchase of products, and any services we provide as an independent online retail platform.
                    </div>

                    <section>
                        <h2>1. Company Information</h2>
                        <p><strong>Prints Carts</strong><br />
                        7181 Beacon Dr 15<br />
                        Reno, NV 89506<br />
                        United States<br />
                        Website: www.printscarts.com<br />
                        Email: support@printscarts.com</p>
                        <p>Prints Carts is an independent retailer offering printers, ink, toner, and printing supplies. We are not affiliated with or endorsed by any manufacturer unless explicitly stated. All trademarks belong to their respective owners.</p>
                    </section>

                    <section>
                        <h2>2. Acceptance of Terms</h2>
                        <p>By using our website, placing an order, or contacting us, you acknowledge that:</p>
                        <ul>
                            <li>You have read and understood these Terms in their entirety.</li>
                            <li>You agree to comply with all applicable local and federal laws.</li>
                            <li>You are at least 18 years of age or have permission from a legal guardian.</li>
                        </ul>
                        <p className="notice">If you disagree with any part of these Terms, please avoid using the site.</p>
                    </section>

                    <section>
                        <h2>3. Use of Website</h2>
                        <p>You agree to use our website only for lawful purposes. Prohibited activities include:</p>
                        <ul>
                            <li>Engaging in fraudulent activity or unauthorized transactions.</li>
                            <li>Interfering with website security or functionality.</li>
                            <li>Attempting unauthorized access to our servers or databases.</li>
                            <li>Copying, scraping, or misusing website content without written consent.</li>
                        </ul>
                        <p>We reserve the right to suspend access for any misuse or violation of these Terms.</p>
                    </section>

                    <section>
                        <h2>4. Product Information & Accuracy</h2>
                        <p>We strive to provide accurate product information, including specifications, images, pricing, and compatibility. However, product details may be updated by manufacturers without notice.</p>
                        <div className="sub-section">
                            <h4>Important notes:</h4>
                            <ul>
                                <li>Colors may vary depending on device settings and monitor calibration.</li>
                                <li>Page yields are estimates based on standardized manufacturer testing.</li>
                                <li>Availability may change due to inventory updates or supply chain variance.</li>
                                <li>Prices are subject to change without prior notice.</li>
                            </ul>
                        </div>
                        <p className="notice">Prints Carts is not responsible for unintentional typographical or listing errors.</p>
                    </section>

                    <section>
                        <h2>5. Ordering & Payments</h2>
                        <p>By placing an order, you confirm that all information provided is accurate and you are authorized to use the selected payment method. Orders are subject to acceptance and availability.</p>
                        <p>We may cancel or refuse orders for reasons including incorrect pricing, payment issues, suspected fraud, or product unavailability.</p>
                        <p className="important">Payment Compliance: Full payment is required before products are shipped. All transactions are processed securely via trusted, PCI-compliant payment providers.</p>
                    </section>

                    <section>
                        <h2>6. Shipping & Delivery</h2>
                        <p>Delivery timelines vary based on location, carrier operations, and product availability. We provide estimated delivery dates during checkout, but these are for informational purposes and are not guaranteed.</p>
                        <p>Risk of loss and title for products transfer to the customer when the order is delivered to the shipping carrier. Please review our Shipping Policy for full details.</p>
                    </section>

                    <section>
                        <h2>7. Returns & Refunds</h2>
                        <p>Returns must follow the guidelines in our Return & Exchange Policy, including a 30-day return window and original packaging requirements.</p>
                        <p>Refunds are issued after inspection and approval. Customers may be responsible for return shipping depending on the specific reason for the return.</p>
                    </section>

                    <section>
                        <h2>8. Intellectual Property</h2>
                        <p>All content on this website—including text, graphics, logos, images, and code layout—is owned by or licensed to Prints Carts and protected by applicable intellectual property laws.</p>
                        <p>You may not copy, modify, distribute, or reproduce any website content without explicit written permission. All third-party trademarks belong to their respective owners.</p>
                    </section>

                    <section>
                        <h2>9. Limitation of Liability</h2>
                        <p>To the extent permitted by law, Prints Carts is not liable for indirect, incidental, or consequential damages, loss of data, or issues caused by third-party carriers.</p>
                        <p className="important">Liability Cap: Our total liability for any claim shall not exceed the amount paid for the specific product involved in the dispute.</p>
                    </section>

                    <section>
                        <h2>10. Disclaimer of Warranties</h2>
                        <p>Our website and content are provided on an “as-is” and “as-available” basis. We do not guarantee uninterrupted access or error-free operation. Manufacturer warranties apply to eligible products as provided by their respective brands.</p>
                    </section>

                    <section>
                        <h2>11. Governing Law & Jurisdiction</h2>
                        <p>These Terms & Conditions are governed by the laws of the United States. Any disputes will be handled under the exclusive jurisdiction of applicable U.S. courts.</p>
                    </section>

                    <section>
                        <h2>12. Contact Us Regarding These Terms</h2>
                        <p>If you have questions about these Terms & Conditions, please contact our legal department:</p>
                        <p>
                            <strong>Email:</strong> support@printscarts.com<br />
                            <strong>Mailing Address:</strong> 7181 Beacon Dr 15, Reno, NV 89506<br />
                            <strong>Official Website:</strong> www.printscarts.com
                        </p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-TC-2026-V1</span>
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

export default TermsConditions;
