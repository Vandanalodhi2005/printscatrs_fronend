import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/PolicyPages.css';

const DoNotSell = () => {
    return (
        <div className="policy-page-wrapper">
            <Navbar />
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <p className="last-updated">Site Policy Profile</p>
                    <h1>Do Not Sell or Share My Personal Information</h1>
                    <p className="last-updated">Effective Date: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        This page explains your privacy rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA). These laws provide California residents with the right to control how their personal information is collected, used, and shared. 
                    </div>

                    <div className="consent">
                        <strong>Privacy Commitment:</strong> Prints Carts respects your privacy and is committed to handling your personal information responsibly and transparently.
                    </div>

                    <section>
                        <h2>1. We Do NOT Sell or Share Personal Information</h2>
                        <p>Prints Carts does not sell, share, or exchange personal information for advertising, remarketing, behavioral tracking, or commercial data-sharing purposes as defined under CCPA/CPRA. We do not:</p>
                        <ul>
                            <li>Sell personal information to third parties</li>
                            <li>Share personal information for cross-context behavioral advertising</li>
                            <li>Use third-party advertising cookies</li>
                            <li>Use retargeting or remarketing systems</li>
                            <li>Transfer data for marketing purposes without consent</li>
                        </ul>
                        <p className="important">Notice: Your personal information is used only for essential business functions such as order processing, secure payments, and customer communication.</p>
                    </section>

                    <section>
                        <h2>2. Your Privacy Rights Under CCPA/CPRA</h2>
                        <p>California residents have the following rights:</p>
                        
                        <div className="sub-section">
                            <h4>Right to Know</h4>
                            <p>You may request information about the personal data we collect, use, disclose, or retain.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Right to Delete</h4>
                            <p>You may request deletion of your personal information, subject to legal requirements.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Right to Correct</h4>
                            <p>You may request corrections to inaccurate information we hold.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Right to Opt Out of Sale or Sharing</h4>
                            <p>You may opt out of any sale or sharing of personal information. (We do not sell or share information, but this right is still offered.)</p>
                        </div>

                        <div className="sub-section">
                            <h4>Right to Limit Use of Sensitive Information</h4>
                            <p>You may request restrictions on the use of sensitive personal information.</p>
                        </div>

                        <div className="sub-section">
                            <h4>Right to Non-Discrimination</h4>
                            <p>We will never deny services, charge different prices, or treat you differently for exercising your privacy rights.</p>
                        </div>
                    </section>

                    <section>
                        <h2>3. How to Submit a Request</h2>
                        <p>If you wish to exercise any CCPA/CPRA privacy rights, you can contact us using the options below.</p>
                        
                        <div className="sub-section">
                            <h4>📧 Email Request</h4>
                            <p>Send your request to: <strong>support@printscarts.com</strong></p>
                            <p>Please include your full name, contact email, and the specific request (Access, Delete, Correct, Opt-Out, etc.).</p>
                        </div>

                        <div className="sub-section">
                            <h4>📬 Mailing Address Request</h4>
                            <p>
                                <strong>Prints Carts</strong><br />
                                7181 Beacon Dr 15<br />
                                Reno, NV 89506<br />
                                United States
                            </p>
                        </div>
                        <p className="notice">Identity Verification: To protect your privacy, we may request additional information to verify your identity before processing your request.</p>
                    </section>

                    <section>
                        <h2>4. Categories of Personal Information We Collect</h2>
                        <p>We collect only information necessary for essential e-commerce operations, such as:</p>
                        <ul>
                            <li>Name and contact details</li>
                            <li>Shipping and billing address</li>
                            <li>Email for order confirmations</li>
                            <li>Payment details (processed securely through third-party systems)</li>
                            <li>Order history</li>
                            <li>Basic website session data (non-marketing cookies)</li>
                        </ul>
                        <p className="notice">We do not collect biometric, geolocation, or highly sensitive information for marketing purposes.</p>
                    </section>

                    <section>
                        <h2>5. Purposes for Using Personal Information</h2>
                        <div className="sub-section">
                            <h4>We Use Information For:</h4>
                            <ul>
                                <li>Order processing & fulfillment</li>
                                <li>Secure payment processing</li>
                                <li>Shipping and delivery logistics</li>
                                <li>Customer support & communication</li>
                                <li>Website functionality and fraud prevention</li>
                            </ul>
                        </div>
                        <div className="sub-section">
                            <h4>We Do NOT Use For:</h4>
                            <ul>
                                <li>Behavioral advertising or cross-site tracking</li>
                                <li>Selling user data or profiling for marketing purposes</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2>6. Third-Party Service Providers</h2>
                        <p>We share data only with essential service providers such as payment processors, shipping carriers, and fraud-prevention services. These partners are contractually required to handle information securely and cannot use it for advertising or resale.</p>
                    </section>

                    <section>
                        <h2>7. Minors’ Personal Information</h2>
                        <p>We do not knowingly collect personal information from individuals under age 13, and we do not sell or share data of minors under age 16.</p>
                    </section>

                    <section>
                        <h2>8. Updates to This Notice</h2>
                        <p>We may update this notice as privacy laws evolve or our business practices change. The updated version will always appear on this page with a revised Last Updated date.</p>
                    </section>

                    <section>
                        <h2>9. Contact Us</h2>
                        <p>If you have questions about your privacy rights or this notice:</p>
                        <p>
                            <strong>Email:</strong> support@printscarts.com<br />
                            <strong>Mailing Address:</strong> 7181 Beacon Dr 15, Reno, NV 89506<br />
                            <strong>Official Website:</strong> www.printscarts.com
                        </p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-DNS-2026-V1</span>
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

export default DoNotSell;

