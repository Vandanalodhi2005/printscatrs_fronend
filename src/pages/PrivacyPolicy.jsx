import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/PolicyPages.css';

const PrivacyPolicy = () => {
    return (
        <div className="policy-page-wrapper">
            <Navbar />
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <p className="last-updated">Site Policy Profile</p>
                    <h1>Privacy Policy – Prints Carts</h1>
                    <p className="last-updated">Effective Date: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Prints Carts (“we,” “our,” or “us”) is committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or make a purchase from www.printscarts.com.
                    </div>
                    
                    <div className="consent">
                        <strong>Important Notice:</strong> By using our website, you agree to the terms outlined in this Privacy Policy. We value your trust and prioritize data security in all our operations.
                    </div>

                    <section>
                        <h2>1. Company Information</h2>
                        <p><strong>Prints Carts</strong><br />
                        7181 Beacon Dr 15<br />
                        Reno, NV 89506<br />
                        United States<br />
                        Email: support@printscarts.com<br />
                        Website: www.printscarts.com</p>
                        <p>We operate as an independent online retailer offering printers, ink, toner, and printing supplies. All brand names and trademarks belong to their respective owners and are used only for identification.</p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>We collect only the information necessary to process orders, support customers, and operate our website efficiently.</p>
                        
                        <h3>A. Information You Provide Voluntarily</h3>
                        <p>This includes information you submit during checkout, account creation, or when contacting us:</p>
                        <ul>
                            <li>Full Name</li>
                            <li>Email Address</li>
                            <li>Billing and Shipping Address</li>
                            <li>Phone Number (optional)</li>
                            <li>Payment Details (processed securely through third-party payment providers)</li>
                            <li>Order History & Communication Logs</li>
                        </ul>

                        <h3>B. Automatically Collected Information</h3>
                        <p>When you browse our website, we collect limited technical data to ensure site performance and security:</p>
                        <ul>
                            <li>IP Address & Browser Type</li>
                            <li>Device Information & OS</li>
                            <li>Pages Viewed & Time Stamps</li>
                            <li>Essential Session Data for Cart Functionality</li>
                        </ul>
                        <p className="notice">Privacy Commitment: We do not use third-party tracking tools for behavioral advertising or data profiling.</p>

                        <h3>C. Cookies & Essential Technologies</h3>
                        <p>We use cookies that are strictly essential for website operations, such as secure checkout and cart management. We do not use advertising cookies or third-party tracking pixels.</p>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We process your information only for legitimate business purposes and essential operational needs:</p>
                        
                        <div className="sub-section">
                            <h4>Order Processing & Fulfillment</h4>
                            <ul>
                                <li>To manage payments, shipping, and delivery schedules</li>
                                <li>To send automated order confirmations and status updates</li>
                                <li>To verify product availability and inventory</li>
                            </ul>
                        </div>

                        <div className="sub-section">
                            <h4>Customer Support & Correspondence</h4>
                            <ul>
                                <li>To respond to product inquiries and technical questions</li>
                                <li>To assist with returns, refunds, and order modifications</li>
                                <li>To provide general consumer assistance</li>
                            </ul>
                        </div>

                        <div className="sub-section">
                            <h4>Operational Integrity & Security</h4>
                            <ul>
                                <li>To monitor website performance and resolve errors</li>
                                <li>To protect against fraud, unauthorized access, and security breaches</li>
                                <li>To ensure a safe and secure checkout experience</li>
                            </ul>
                        </div>

                        <p className="important">Data Protection Guarantee: We do not sell, rent, or share your personal information with third parties for marketing or advertising purposes.</p>
                    </section>

                    <section>
                        <h2>4. Information Sharing</h2>
                        <p>We only share your information with trusted partners necessary for providing our services:</p>
                        <ul>
                            <li>Secure Payment Processors (e.g., Stripe, PayPal)</li>
                            <li>Logistics & Shipping Carriers (e.g., UPS, FedEx)</li>
                            <li>Essential IT & Managed Hosting Providers</li>
                            <li>Legal Authorities (when strictly required by law)</li>
                        </ul>
                        <p>All service partners are contractually required to handle your data with the highest level of security and confidentiality.</p>
                    </section>

                    <section>
                        <h2>5. Data Security Protocols</h2>
                        <p>We implement robust industry-standard security measures to safeguard your information:</p>
                        <ul>
                            <li>Full SSL/TLS Encryption for all web traffic</li>
                            <li>PCI-Compliant Payment Processing</li>
                            <li>Stringent Internal Access Controls</li>
                            <li>Continuous Monitoring for Suspicious Activity</li>
                        </ul>
                        <p>While no method is 100% secure, we are committed to maintaining the highest security hardware and software standards.</p>
                    </section>

                    <section>
                        <h2>6. Your Privacy Rights</h2>
                        <p>Depending on your jurisdiction, you have specific rights regarding your personal data:</p>
                        <ul>
                            <li><strong>Right of Access:</strong> Request a full copy of the data we hold.</li>
                            <li><strong>Right to Rectification:</strong> Request updates to inaccurate information.</li>
                            <li><strong>Right to Erasure:</strong> Request data deletion (subject to legal retention rules).</li>
                            <li><strong>Right to Opt Out:</strong> Unsubscribe from non-essential communications at any time.</li>
                        </ul>

                        <h3>CCPA/CPRA Compliance (California)</h3>
                        <p>California residents have the right to know what data is collected, the right to request deletion, and the right to non-discrimination for exercising these rights. Prints Carts does not sell personal information.</p>
                    </section>

                    <section>
                        <h2>7. Data Retention & Storage</h2>
                        <p>We retain your information only as long as necessary to fulfill orders, meet tax obligations, and maintain business records. Once no longer required, data is securely purged or anonymized.</p>
                    </section>

                    <section>
                        <h2>8. International Data Privacy</h2>
                        <p>By using our website, you understand that your information may be processed in the United States, where we maintain our primary operations and secure servers.</p>
                    </section>

                    <section>
                        <h2>9. Contact Our Privacy Team</h2>
                        <p>For any privacy-related requests or questions about our data practices:</p>
                        <p>
                            <strong>Email:</strong> support@printscarts.com<br />
                            <strong>Mailing Address:</strong> 7181 Beacon Dr 15, Reno, NV 89506<br />
                            <strong>Official Website:</strong> www.printscarts.com
                        </p>
                    </section>
                </div>
                
                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-PP-2026-V1</span>
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

export default PrivacyPolicy;
