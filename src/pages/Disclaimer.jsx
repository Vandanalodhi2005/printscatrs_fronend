import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/PolicyPages.css';

const Disclaimer = () => {
    return (
        <div className="policy-page-wrapper">
            <Navbar />
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <p className="last-updated">Site Policy Profile</p>
                    <h1>Disclaimer – Prints Carts</h1>
                    <p className="last-updated">Effective Date: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        The information provided on www.printscarts.com (“Website”) is intended to help customers make informed purchasing decisions. Prints Carts strives for accuracy and transparency in all product listings, descriptions, and content. However, certain limitations and standard retail disclaimers apply.
                    </div>

                    <div className="notice">
                        <strong>Important:</strong> Please read this Disclaimer carefully before using our website or purchasing products.
                    </div>

                    <section>
                        <h2>1. Product Information & Accuracy</h2>
                        <p>We make reasonable efforts to ensure that product descriptions are clear and accurate, images represent the items being sold, and specifications reflect manufacturer-provided information. However:</p>
                        <ul>
                            <li>Manufacturers may change product details without prior notice</li>
                            <li>Colors may appear differently due to screen settings</li>
                            <li>Page yields for ink and toner are approximate based on standardized testing</li>
                            <li>Features and compatibility may vary depending on usage conditions</li>
                        </ul>
                        <p className="notice">Prints Carts is not responsible for unintentional typographical errors, outdated listings, or minor variations between product images and the physical items.</p>
                    </section>

                    <section>
                        <h2>2. No Professional or Technical Advice</h2>
                        <p>All content on this website is provided for informational and retail purposes only. Prints Carts does not provide printer setup instructions, troubleshooting, technical support, repair advice, or professional recommendations.</p>
                        <p className="notice">Customers should refer to official manufacturer documentation for installation, usage instructions, and technical support.</p>
                    </section>

                    <section>
                        <h2>3. Brand Independence</h2>
                        <p>Prints Carts is an independent online retailer. We are not affiliated with, sponsored by, or endorsed by any printer or technology manufacturer, including but not limited to:</p>
                        <ul>
                            <li>HP (Hewlett-Packard)</li>
                            <li>Canon</li>
                            <li>Epson</li>
                            <li>Brother</li>
                            <li>Lexmark</li>
                            <li>Xerox</li>
                        </ul>
                        <p className="notice">All product names, logos, and trademarks belong to their respective owners and are used on this website for identification and compatibility purposes only. Our use of these trademarks does not imply partnership or authorization.</p>
                    </section>

                    <section>
                        <h2>4. Manufacturer Warranties</h2>
                        <p>Products sold on our website may include warranties offered directly by their respective manufacturers. Important notes:</p>
                        <ul>
                            <li>Warranty terms vary by brand and product</li>
                            <li>Manufacturer warranties are not controlled by Prints Carts</li>
                            <li>Coverage depends on the manufacturer’s policies and region</li>
                        </ul>
                        <p className="notice">If you have questions about warranty coverage, please contact the respective manufacturer directly.</p>
                    </section>

                    <section>
                        <h2>5. Third-Party Links & External Websites</h2>
                        <p>Our website may include links to third-party websites (such as carriers or payment providers). Prints Carts is not responsible for the accuracy of external content, privacy practices of third-party sites, or policies outside our website.</p>
                    </section>

                    <section>
                        <h2>6. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law, Prints Carts is not liable for:</p>
                        <ul>
                            <li>Indirect, incidental, or consequential damages</li>
                            <li>Loss of data, revenue, or business opportunities</li>
                            <li>Damages arising from product misuse</li>
                            <li>Issues caused by third-party carriers or shipping delays</li>
                            <li>Errors in product information provided by manufacturers</li>
                        </ul>
                        <p className="important">Liability Notice: Our liability for any product purchased is limited to the purchase price of that product.</p>
                    </section>

                    <section>
                        <h2>7. Updates to This Disclaimer</h2>
                        <p>Prints Carts may update this Disclaimer to reflect changes in regulations, company policies, or enhancements in website content. Any changes will be posted on this page with a revised “Last Updated” date.</p>
                    </section>

                    <section>
                        <h2>8. Contact Information</h2>
                        <p>If you have questions about this Disclaimer, please contact us:</p>
                        <p>
                            <strong>Email:</strong> support@printscarts.com<br />
                            <strong>Address:</strong> 7181 Beacon Dr 15, Reno, NV 89506<br />
                            <strong>Official Website:</strong> www.printscarts.com
                        </p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-DISC-2026-V1</span>
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

export default Disclaimer;

