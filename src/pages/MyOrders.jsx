import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listMyOrders } from '../redux/actions/orderActions';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
      if (!userInfo) {
          navigate('/signin');
      } else {
          dispatch(listMyOrders());
      }
  }, [dispatch, navigate, userInfo]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, paddingTop: '80px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Centered Executive Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0f3d91', marginBottom: '16px', textTransform: 'uppercase' }}>Command Center</h1>
            <div style={{ width: '80px', height: '4px', background: '#0a3382', margin: '0 auto 24px', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto', fontWeight: '500' }}>
               Manage your procurement history and monitor the lifecycle of your professional assets.
            </p>
          </div>

          {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                 <div style={{ width: '40px', height: '40px', border: '4px solid #f1f5f9', borderTop: '4px solid #0f3d91', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
             </div>
          ) : error ? (
             <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
                 <FiAlertCircle size={48} style={{ color: '#ef4444', marginBottom: '16px' }} />
                 <h3 style={{ color: '#991b1b', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>Synchronization Error</h3>
                 <p style={{ color: '#ef4444', fontWeight: '600' }}>{error}</p>
                 <button onClick={() => dispatch(listMyOrders())} style={{ mt: '24px', padding: '12px 32px', background: '#0f3d91', color: '#ffffff', borderRadius: '12px', border: 'none', fontWeight: '800', cursor: 'pointer', marginTop: '24px' }}>Retry Connection</button>
             </div>
          ) : orders && orders.length === 0 ? (
             <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', background: '#f8fafc', padding: '80px 40px', borderRadius: '40px', border: '1px dashed #cbd5e1' }}>
                 <FiPackage size={64} style={{ color: '#cbd5e1', marginBottom: '24px' }} />
                 <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b', marginBottom: '16px' }}>No Orders Recorded</h2>
                 <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>Your procurement history is currently empty. Visit the inventory hub to begin.</p>
                 <Link to="/printers" style={{ background: '#0f3d91', color: '#ffffff', padding: '16px 40px', borderRadius: '16px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none' }}>View Catalog</Link>
             </div>
          ) : (
            <div style={{ display: 'grid', gap: '24px' }}>
              {orders.map((order) => (
                <div key={order._id} style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '32px' }}>
                  <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ width: '64px', height: '64px', background: '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f3d91' }}>
                        <FiPackage size={32} />
                    </div>
                    <div>
                        <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Manifest Reference</p>
                        <h4 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: 0 }}>#{order._id.slice(-8).toUpperCase()}</h4>
                    </div>
                    <div>
                        <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Transaction Date</p>
                        <p style={{ fontSize: '14px', fontWeight: '700', color: '#475569', margin: 0 }}>{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Fiscal Total</p>
                        <p style={{ fontSize: '18px', fontWeight: '900', color: '#0f3d91', margin: 0 }}>${order.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ padding: '8px 20px', borderRadius: '99px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', background: order.isDelivered ? '#ecfdf5' : order.isPaid ? '#eff6ff' : '#fff7ed', color: order.isDelivered ? '#059669' : order.isPaid ? '#0f3d91' : '#d97706', border: '1px solid currentColor' }}>
                          {order.isDelivered ? "Delivered" : order.isPaid ? "Processing" : "Action Required"}
                      </div>
                      <Link to={`/track-order?id=${order._id}`} style={{ padding: '10px 24px', background: '#0f3d91', color: '#ffffff', borderRadius: '12px', textDecoration: 'none', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}>Monitor</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
export default MyOrders;
