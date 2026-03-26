import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/PolicyPages.css';

const Accessibility = () => {
    return (
        <div className="policy-page-wrapper">
            <Navbar />
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <p className="last-updated">Site Policy Profile</p>
                    <h1>Accessibility Statement – Prints Carts</h1>
                    <p className="last-updated">Effective Date: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Prints Carts is committed to making our website accessible and usable for all individuals, including people with disabilities. We believe everyone should have a barrier-free shopping experience and equal access to the information and services offered on www.printscarts.com.
                    </div>

                    <div className="consent">
                        <strong>Continuous Improvement:</strong> We continually improve our website to meet accessibility standards and provide a positive experience for all visitors.
                    </div>

                    <section>
                        <h2>1. Our Commitment</h2>
                        <p>We aim to follow best practices based on widely recognized accessibility guidelines, including:</p>
                        <ul>
                            <li>WCAG 2.1 AA standards (Web Content Accessibility Guidelines)</li>
                            <li>ADA Title III principles</li>
                            <li>Section 508 recommendations where applicable</li>
                        </ul>
                        <p className="notice">Our goal is to make our website readable, navigable, and usable with assistive technologies.</p>
                    </section>

                    <section>
                        <h2>2. Accessibility Features on Our Website</h2>
                        <p>To support accessibility, Prints Carts includes features such as:</p>
                        
                        <div className="sub-section">
                            <h4>✔ Keyboard navigation support</h4>
                            <p>Users can move through menus, links, and sections using keyboard-only navigation.</p>
                        </div>

                        <div className="sub-section">
                            <h4>✔ Screen reader compatibility</h4>
                            <p>We design pages to be readable by screen readers and assistive tools.</p>
                        </div>

                        <div className="sub-section">
                            <h4>✔ Text alternatives</h4>
                            <p>Images include descriptive alt tags wherever appropriate.</p>
                        </div>

                        <div className="sub-section">
                            <h4>✔ Consistent headings & structure</h4>
                            <p>Clear headings help visitors understand page organization.</p>
                        </div>

                        <div className="sub-section">
                            <h4>✔ Adjustable text size</h4>
                            <p>Users can zoom in or adjust browser text settings without losing functionality.</p>
                        </div>

                        <div className="sub-section">
                            <h4>✔ Clear color contrast</h4>
                            <p>We aim to use readable text and visual elements that meet WCAG contrast guidelines.</p>
                        </div>

                        <div className="sub-section">
                            <h4>✔ Simple and predictable navigation</h4>
                            <p>Menus and page layouts remain consistent across the site.</p>
                        </div>
                    </section>

                    <section>
                        <h2>3. Ongoing Accessibility Efforts</h2>
                        <p>Accessibility is a continuous process. We regularly review website content, improve navigation, test pages for usability, and update features to support more assistive tools. We are committed to making reasonable changes as technology evolves.</p>
                    </section>

                    <section>
                        <h2>4. Third-Party Tools & Content</h2>
                        <p>Some tools or links on our website may be provided by third parties (e.g., payment processors, shipping carriers). While we cannot control third-party accessibility practices, we encourage these partners to support inclusive experiences.</p>
                    </section>

                    <section>
                        <h2>5. Having Difficulty Accessing Our Website?</h2>
                        <p>We genuinely want to help. If you experience any difficulty browsing or using our website, you may contact us for assistance.</p>
                        
                        <div className="sub-section">
                            <h4>📧 Contact Details</h4>
                            <p>
                                <strong>Email Support:</strong> support@printscarts.com<br />
                                <strong>Mailing Address:</strong> Prints Carts, 7181 Beacon Dr 15, Reno, NV 89506, United States
                            </p>
                        </div>

                        <div className="sub-section">
                            <h4>Please describe:</h4>
                            <ul>
                                <li>The page or feature you were trying to access</li>
                                <li>The nature of the issue</li>
                                <li>Any assistive technology you were using</li>
                            </ul>
                        </div>
                        <p className="notice">We will work to resolve any reported accessibility issues promptly.</p>
                    </section>

                    <section>
                        <h2>6. Feedback & Suggestions</h2>
                        <p>We value accessibility feedback. If you have ideas or recommendations that may help improve your experience, please contact us. Your input helps us continue to improve accessibility for all users.</p>
                    </section>

                    <section>
                        <h2>7. Commitment to Improvement</h2>
                        <p>Prints Carts will continue reviewing website features and making updates to ensure accessibility remains a priority. Our goal is to provide all customers with a comfortable, inclusive, and user-friendly shopping experience.</p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-AS-2026-V1</span>
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

export default Accessibility;

