import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserProfile } from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';
import { addToCart } from '../redux/actions/cartActions';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { useFavorites } from '../context/useFavorites';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import '../styles/pages.css';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo: user } = userLogin;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const [activeTab, setActiveTab] = useState('profile');
    // const profileImage = 'https://i.pravatar.cc/150?u=' + (user?.email || 'user');

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '+1 (555) 000-0000',
        address: user?.address || '123 Business Ave, Suite 100, New York, NY 10001'
    });

    const [addedToCart, setAddedToCart] = useState({});

    const { favorites, removeFavorite } = useFavorites();

    const handleAddToCart = (item) => {
        // Use either slug or id, assuming addToCart handles it (it expects idOrSlug)
        // Check if item has slug, otherwise use id
        dispatch(addToCart(item.slug || item.id, 1));
        
        setAddedToCart(prev => ({ ...prev, [item.id]: true }));
        setTimeout(() => setAddedToCart(prev => {
            const copy = { ...prev };
            delete copy[item.id];
            return copy;
        }), 2000);
    };



    useEffect(() => {
        if (!user) {
            navigate('/signin');
        } else {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: '+1 (555) 000-0000',
                address: '123 Business Ave, Suite 100, New York, NY 10001'
            });
            // Check for passed state from Navbar
            if (location.state?.activeTab) {
                setActiveTab(location.state.activeTab);
                // Clear the state so it doesn't get stuck if they click away and back
                window.history.replaceState({}, document.title);
            }

            // ALWAYS dispatch fetch orders when on profile, or just when tab is active
            dispatch(listMyOrders());
        }
    }, [user, navigate, dispatch, location]);

    if (!user) return null;

    const handleSignOut = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        // Here you would normally call an API to update the user
        // For now we just exit edit mode and show a local update
        setIsEditing(false);
        // Since useAuth provides the user, in a real app the auth context would update
        console.log('Profile updated:', formData);
    };


    // Favorites will be sourced from FavoritesContext
    // (persisted to localStorage by the provider)

    return (
        <>
            <Navbar />
            <div className="profile-dashboard">
                <div className="profile-container">
                    {/* Sidebar */}
                    <aside className="profile-sidebar">
                        <div className="profile-user-summary">
                            <div className="profile-image-container">
                                <FaUserCircle className="w-full h-full text-slate-300" />
                            </div>
                            <h2>{(formData.name?.split(' ')[0]) || 'TechnoSky User'}</h2>
                            <p>{formData.email}</p>
                        </div>

                        <nav className="profile-nav">
                            <button
                                className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
                                </svg>
                                My Account
                            </button>
                            <button
                                className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                Order History
                            </button>

                            <button onClick={handleSignOut} className="profile-nav-item danger">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                                </svg>
                                Logout
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="profile-content">
                        {activeTab === 'profile' && (
                            <div className="profile-section">
                                <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <h2 style={{ margin: 0 }}>Account Information</h2>
                                    <button
                                        className="category-btn"
                                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                        style={{ background: isEditing ? '#0f3d91' : 'transparent', color: isEditing ? '#fff' : '#0f3d91', border: '1px solid #0f3d91' }}
                                    >
                                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                                    </button>
                                </div>

                                <div className="contact-details">
                                    <div className="contact-detail-item">
                                        <div className="contact-icon" style={{ background: '#f0f4ff', color: '#0f3d91' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
                                            </svg>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3>Full Name</h3>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="search-input"
                                                    style={{ padding: '8px', marginTop: '4px' }}
                                                />
                                            ) : (
                                                <p>{formData.name || 'User'}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="contact-detail-item">
                                        <div className="contact-icon" style={{ background: '#f0f4ff', color: '#0f3d91' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
                                                <path d="M22 6L12 13L2 6" />
                                            </svg>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3>Email Address</h3>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="search-input"
                                                    style={{ padding: '8px', marginTop: '4px' }}
                                                />
                                            ) : (
                                                <p>{formData.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="contact-detail-item">
                                        <div className="contact-icon" style={{ background: '#f0f4ff', color: '#0f3d91' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
                                                <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
                                                <path d="M5 20h14" />
                                                <path d="M12 12V6" />
                                                <path d="M12 6l-3 3m3-3l3 3" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3>Account Role</h3>
                                            <p style={{ textTransform: 'capitalize' }}>{user.role || 'Customer'}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="profile-section">
                                <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h2 style={{ margin: 0 }}>My Orders</h2>
                                </div>
                                
                                {loadingOrders ? (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                                        <p className="text-slate-500 font-medium">Loading your orders...</p>
                                    </div>
                                ) : errorOrders ? (
                                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                                        <FiAlertCircle className="mx-auto text-red-500 text-3xl mb-2" />
                                        <h3 className="text-red-800 font-bold text-lg mb-1">Error Loading Orders</h3>
                                        <p className="text-red-600">{errorOrders}</p>
                                        <button 
                                            onClick={() => dispatch(listMyOrders())}
                                            className="mt-4 px-6 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                ) : orders && orders.length === 0 ? (
                                    <div style={{ textAlign: 'center', background: '#f8fafc', padding: '60px 40px', borderRadius: '32px', border: '1px dashed #cbd5e1' }}>
                                        <div style={{ width: '80px', height: '80px', background: '#ffffff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#cbd5e1', border: '1px solid #f1f5f9' }}>
                                            <FiPackage size={40} />
                                        </div>
                                        <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b', marginBottom: '12px', textTransform: 'uppercase' }}>No Orders Recorded</h2>
                                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', fontWeight: '500' }}>Your procurement history is currently empty.</p>
                                        <Link 
                                            to="/printers" 
                                            style={{ display: 'inline-flex', background: '#0f3d91', color: '#ffffff', padding: '16px 40px', borderRadius: '16px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.05em' }}
                                        >
                                            Inaugurate Procurement
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div
                                        key={order._id}
                                        className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group"
                                        >
                                        {/* Order Header */}
                                        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                                <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order Placed</p>
                                                <p className="text-sm font-bold text-slate-700">
                                                    {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                                </div>
                                                <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total</p>
                                                <p className="text-sm font-bold text-slate-900">${order.totalPrice.toFixed(2)}</p>
                                                </div>
                                                <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order #</p>
                                                <p className="text-sm font-mono text-slate-600">{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 sm:mt-0 flex items-center gap-3">
                                                {/* Status Badge */}
                                                {order.status === 'Failed' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                                        <FiAlertCircle /> Failed
                                                    </span>
                                                ) : order.isDelivered ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                                        <FiCheckCircle /> Delivered
                                                    </span>
                                                ) : order.isPaid ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                                        <FiTruck /> Processing
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                                        <FiClock /> Pending
                                                    </span>
                                                )}
                                                
                                                {/* Details Button */}
                                                <Link 
                                                    to={`/order/${order._id}`}
                                                    className="hidden sm:inline-block px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Order Body */}
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row gap-6">
                                            {/* Preview Items (First 2) */}
                                            <div className="flex-1 space-y-4">
                                                {order.orderItems.slice(0, 2).map((item, index) => (
                                                    <div key={index} className="flex items-start gap-4">
                                                        <div className="w-16 h-16 bg-white border border-slate-100 rounded-lg p-2 flex-shrink-0">
                                                            <img 
                                                                src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL.replace('/api', '')}${item.image}`} 
                                                                alt={item.name} 
                                                                className="w-full h-full object-contain mix-blend-multiply"
                                                            />
                                                        </div>
                                                        <div className='flex-1 min-w-0'>
                                                            <Link to={`/product/${item.slug || item.product}`} className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-2">
                                                                {item.name}
                                                            </Link>
                                                            <p className="text-xs text-slate-500 mt-1">Qty: {item.qty} × ${item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {order.orderItems.length > 2 && (
                                                    <p className="text-xs text-slate-400 font-medium pl-20">+ {order.orderItems.length - 2} more items</p>
                                                )}
                                            </div>
                                            
                                            {/* Mobile Details Button */}
                                            <div className="sm:hidden mt-2">
                                                    <Link 
                                                        to={`/order/${order._id}`}
                                                        className="w-full block text-center px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                                                    >
                                                        View Order Details
                                                    </Link>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>
                        )}


                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
