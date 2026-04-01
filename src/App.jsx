import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import "./App.css";

// Essential / Above the fold components (Keep static)
import Home from "./pages/Home";
import ScrollToTop from "./components/common/ScrollToTop";
import LiveChat from "./components/LiveChat/LiveChat";

// Lazy load everything else
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import DoNotSell from "./pages/DoNotSell";
import Accessibility from "./pages/Accessibility";
import Disclaimer from "./pages/Disclaimer";
import Printers from "./pages/Printers";
import InkToner from "./pages/InkToner";
import AboutUs from "./pages/AboutUs";
import ProductDetails from "./pages/ProductDetails";
import RefundReturnPolicy from "./pages/RefundReturnPolicy";
import ReturnExchangePolicy from "./pages/ReturnExchangePolicy";
import PolicyHub from "./pages/PolicyHub";
import Blogs from "./pages/Blogs";
import TopHomePrinters2026 from "./pages/blogs/TopHomePrinters2026";
import InkjetVsLaserGuide from "./pages/blogs/InkjetVsLaserGuide";
import PrinterOfflineFixGuide from "./pages/blogs/PrinterOfflineFixGuide";
import SaveMoneyInkGuide from "./pages/blogs/SaveMoneyInkGuide";
import PrinterSetupGuide from "./pages/blogs/PrinterSetupGuide";
import EcoFriendlyPrintingGuide from "./pages/blogs/EcoFriendlyPrintingGuide";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import TrackOrder from "./pages/TrackOrder";

// Admin - Heavy components
const AdminDashboard = lazy(() => import("./components/admin/Pages/AdminDashboard"));
const AdminProducts = lazy(() => import("./components/admin/Pages/AdminProducts"));
const AdminOrders = lazy(() => import("./components/admin/Pages/AdminOrders"));
const AdminCustomers = lazy(() => import("./components/admin/Pages/AdminCustomers"));
const AdminCategories = lazy(() => import("./components/admin/Pages/AdminCategories"));
const AdminSettings = lazy(() => import("./components/admin/Pages/AdminSettings"));
const AdminChat = lazy(() => import("./components/admin/Pages/AdminChat"));
const AdminAnalytics = lazy(() => import("./components/admin/Pages/AdminAnalytics"));
const AdminLayout = lazy(() => import("./components/admin/Layout/AdminLayout"));
const AdminRoute = lazy(() => import("./components/admin/AdminRoute"));

// Loading Component
const PageLoader = () => (
    <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fff'
    }}>
        <div className="loader">Loading...</div>
    </div>
);

function App() {
  return (
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <ScrollToTop />
            
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/printers" element={<Printers />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/printers" element={<Printers />} />
                <Route path="/ink-toner" element={<InkToner />} />
                <Route path="/ink-toner/:id" element={<ProductDetails />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/top-10-home-printers-2026" element={<TopHomePrinters2026 />} />
                <Route path="/blogs/inkjet-vs-laser-printers-2026" element={<InkjetVsLaserGuide />} />
                <Route path="/blogs/printer-offline-fix-guide-2026" element={<PrinterOfflineFixGuide />} />
                <Route path="/blogs/save-money-on-ink-toner-2026" element={<SaveMoneyInkGuide />} />
                <Route path="/blogs/printer-setup-guide-2026" element={<PrinterSetupGuide />} />
                <Route path="/blogs/eco-friendly-printing-guide-2026" element={<EcoFriendlyPrintingGuide />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/policies" element={<PolicyHub />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
                <Route path="/return-exchange-policy" element={<ReturnExchangePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/do-not-sell" element={<DoNotSell />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/disclaimer" element={<Disclaimer />} />

                {/* Auth */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Shop */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />

                {/* User */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/track-order" element={<TrackOrder />} />

                {/* Admin */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="chat" element={<AdminChat />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route index element={<Navigate to="dashboard" replace />} />
                </Route>

                {/* Old Dashboard Routes (Commented out/Removed) */}
                {/* <Route path="/dashboard" element={...} /> */}
              </Routes>
            </Suspense>
          </Router>
        </FavoritesProvider>
      </CartProvider>
  );
}

export default App;
