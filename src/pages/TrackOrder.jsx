import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import PageContainer from "../components/common/PageContainer";
import { 
    FiSearch, FiPackage, FiTruck, FiMapPin, 
    FiCheckCircle, FiAlertCircle, FiUser, 
    FiMail, FiShoppingCart, FiCreditCard,
    FiClock, FiChevronRight, FiFileText
} from "react-icons/fi";

const TrackOrder = () => {
    const [searchParams] = useSearchParams();
    const urlId = searchParams.get('id');

    const [orderId, setOrderId] = useState(urlId || "");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (urlId) {
            handleTrack(null, urlId);
        }
    }, [urlId]);

    const handleTrack = async (e, idOverride) => {
        if (e) e.preventDefault();
        const idToUse = idOverride || orderId;
        const cleanId = idToUse.replace('#', '').replace('ORD-', '').trim();
        if (!cleanId) return;

        try {
            setLoading(true);
            setError(null);
            setOrder(null);
            
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${cleanId}`);
            setOrder(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Order not found. Please check your Order ID.");
            setLoading(false);
        }
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'Processing': return 1;
            case 'Shipped': return 2;
            case 'Out for Delivery': return 3;
            case 'Delivered': return 4;
            default: return 0; 
        }
    };

    const steps = [
        { label: 'Authorized', icon: FiCheckCircle, desc: 'Order received' },
        { label: 'Processing', icon: FiPackage, desc: 'Preparing items' },
        { label: 'Shipped', icon: FiTruck, desc: 'Carrier in transit' },
        { label: 'Delivered', icon: FiShoppingCart, desc: 'Package arrived' },
    ];

    const getRealStatus = (order) => {
        if (order.status === 'Failed' || (!order.isPaid && order.paymentMethod !== 'Cash on Delivery' && !order.isPaid)) {
            return { label: 'Payment Error / Order Suspended', color: 'text-red-500', bg: 'bg-red-50', icon: <FiAlertCircle /> };
        }
        if (order.isDelivered) {
            return { label: 'Delivered Successfully', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: <FiCheckCircle /> };
        }
        return { label: order.status || 'Manifest Processing', color: 'text-blue-600', bg: 'bg-blue-50', icon: <FiClock /> };
    };

    const realStatus = order ? getRealStatus(order) : null;
    const currentStep = order ? getStatusStep(order.status) : 0;

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-20">
                <PageContainer>
                    <div className="max-w-4xl mx-auto px-4">
                        {/* Executive Header */}
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#0F3D91] uppercase bg-blue-50 rounded-full border border-blue-100">
                                Shipment Intelligence
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] tracking-tighter mb-4">
                                Track Your <span className="text-[#0F3D91]">Order</span>
                            </h1>
                            <p className="text-[#64748B] text-lg max-w-xl mx-auto leading-relaxed">
                                Monitor your high-performance printing equipment as it moves from our facility to your doorstep.
                            </p>
                        </div>

                        {/* Premium Search Console */}
                        <div className="relative group mb-12">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#0F3D91] to-[#1E40AF] rounded-2xl blur opacity-15 group-hover:opacity-25 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2">
                                <div className="flex-grow flex items-center px-4 py-3">
                                    <FiSearch className="text-slate-400 mr-3 text-xl" />
                                    <input 
                                        type="text"
                                        placeholder="Order Manifest ID (e.g. 64d3...)"
                                        className="w-full bg-transparent border-none focus:ring-0 text-slate-800 font-medium placeholder:text-slate-400 text-lg"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleTrack(e)}
                                    />
                                </div>
                                <button 
                                    onClick={(e) => handleTrack(e)}
                                    disabled={loading || !orderId.trim()}
                                    className="px-10 py-4 bg-[#0F3D91] hover:bg-[#1E40AF] text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/10 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Locate Shipment <FiChevronRight /></>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error State */}
                        {error && (
                            <div className="bg-white border-l-4 border-red-500 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-red-50 rounded-full text-red-500">
                                        <FiAlertCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Locate Failed</h3>
                                        <p className="text-slate-500 text-sm">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tracking Results */}
                        {order && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                {/* Order Overview Card */}
                                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0F3D91] border border-slate-100">
                                                <FiFileText size={28} />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Manifest Reference</h2>
                                                <p className="text-2xl font-black text-slate-900 tracking-tight">#{order._id.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>
                                        
                                        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl ${realStatus.bg} ${realStatus.color} border border-current/10 font-black text-sm uppercase tracking-wider shadow-sm`}>
                                            {realStatus.icon}
                                            {realStatus.label}
                                        </div>
                                    </div>

                                    {/* Tracking Timeline */}
                                    <div className="p-8 md:p-12">
                                        <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-0">
                                            {/* Logic for Progress Line */}
                                            <div className="absolute hidden md:block top-6 left-0 right-0 h-1 bg-slate-100 -z-0 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#0F3D91] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(15,61,145,0.4)]"
                                                    style={{ width: `${(currentStep > 0 ? (currentStep / steps.length) * 100 : 0)}%` }}
                                                ></div>
                                            </div>

                                            {steps.map((step, idx) => {
                                                const isCompleted = idx < currentStep;
                                                const isCurrent = idx === currentStep - 1;
                                                
                                                return (
                                                    <div key={idx} className="relative z-10 flex flex-row md:flex-col items-center gap-6 md:gap-4 md:w-1/4 group">
                                                        <div className={`
                                                            w-12 h-12 rounded-2xl border-4 flex items-center justify-center transition-all duration-500
                                                            ${isCompleted 
                                                                ? 'bg-[#0F3D91] border-blue-50 text-white shadow-lg shadow-blue-200 scale-110' 
                                                                : 'bg-white border-white text-slate-300 shadow-sm'}
                                                            ${isCurrent ? 'ring-4 ring-blue-500/20' : ''}
                                                        `}>
                                                            <step.icon size={20} className={isCompleted ? 'animate-pulse' : ''} />
                                                        </div>
                                                        <div className="text-left md:text-center">
                                                            <h4 className={`text-sm font-black uppercase tracking-widest ${isCompleted ? 'text-[#1E293B]' : 'text-slate-300'}`}>
                                                                {step.label}
                                                            </h4>
                                                            <p className="text-xs text-slate-400 font-medium">{step.desc}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Multi-Column Details */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column: Shipment Details */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Products Manifesto */}
                                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                                            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                                                <div className="w-2 h-6 bg-[#0F3D91] rounded-full"></div>
                                                Order Contents
                                            </h3>
                                            <div className="space-y-6">
                                                {order.orderItems.map((item, i) => (
                                                    <div key={i} className="flex gap-6 group">
                                                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex-shrink-0 p-3 border border-slate-100 group-hover:border-blue-100 transition-colors">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name} 
                                                                className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="flex-grow flex flex-col justify-center">
                                                            <Link to={`/product/${item.product}`} className="text-[#1E293B] font-bold text-lg hover:text-[#0F3D91] transition-colors line-clamp-1">
                                                                {item.name}
                                                            </Link>
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Qty: {item.qty}</span>
                                                                <span className="text-[#0F3D91] font-black">${item.price.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Logistics Info */}
                                        <div className="bg-[#1E293B] text-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                                <FiTruck size={120} />
                                            </div>
                                            <h3 className="text-lg font-black mb-8 flex items-center gap-3">
                                                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                                                Logistics Intelligence
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                                <div className="space-y-6">
                                                                <div className="flex items-start gap-4">
                                                        <div className="p-2.5 bg-white/10 rounded-xl text-blue-400">
                                                            <FiMapPin />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Destination Address</p>
                                                            <p className="text-sm font-medium leading-relaxed">
                                                                {order.shippingAddress.address}<br />
                                                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                                                {order.shippingAddress.country}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2.5 bg-white/10 rounded-xl text-emerald-400">
                                                            <FiUser />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Recipient</p>
                                                            <p className="text-sm font-bold">{order.user?.name || order.shippingAddress?.name}</p>
                                                            <p className="text-xs text-white/60 font-medium">{order.user?.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Financial Summary */}
                                    <div className="space-y-8">
                                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                                            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                                                <div className="w-2 h-6 bg-[#0F3D91] rounded-full"></div>
                                                Fiscal Summary
                                            </h3>
                                            
                                            <div className="space-y-4 mb-8">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-500 font-medium">Subtotal Revenue</span>
                                                    <span className="text-[#1E293B] font-bold">${order.itemsPrice.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-500 font-medium">Logistics Allocation</span>
                                                    <span className="text-[#1E293B] font-bold">${order.shippingPrice.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-500 font-medium">Taxation Duty</span>
                                                    <span className="text-[#1E293B] font-bold">${order.taxPrice.toFixed(2)}</span>
                                                </div>
                                                <div className="pt-4 border-t border-slate-50">
                                                    <div className="flex justify-between items-end">
                                                        <span className="text-[#1E293B] font-black text-lg">Gross Total</span>
                                                        <span className="text-[#0F3D91] font-black text-3xl tracking-tighter">${order.totalPrice.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`flex items-center justify-between p-4 rounded-2xl border ${order.isPaid ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                                                <div className="flex items-center gap-3">
                                                    <FiCreditCard className="opacity-70" />
                                                    <span className="text-xs font-black uppercase tracking-widest">{order.isPaid ? 'Transaction Settled' : 'Payment Required'}</span>
                                                </div>
                                                {order.isPaid && <FiCheckCircle />}
                                                {!order.isPaid && <FiAlertCircle />}
                                            </div>

                                            {!order.isPaid && (
                                                <button className="w-full mt-4 py-3 bg-[#0F3D91] text-white rounded-xl font-bold text-sm hover:translate-y-[-2px] transition-transform active:scale-[0.98] shadow-lg shadow-blue-900/10">
                                                    Complete Secure Payment
                                                </button>
                                            )}
                                        </div>

                                        <div className="bg-blue-50/50 rounded-3xl border border-blue-100 p-8 text-center group">
                                            <h4 className="text-[#0F3D91] font-black mb-3">Professional Support</h4>
                                            <p className="text-[#475569] text-xs font-medium leading-relaxed mb-6"> Our support executive team is available 24/7 for logistics inquiries.</p>
                                            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-black text-[#0F3D91] hover:underline underline-offset-4 transition-all">
                                                Open Support Ticket <FiChevronRight />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </PageContainer>
            </main>

            <Footer />

            <style>{`
                @keyframes pulse-ring {
                    0% { transform: scale(.33); }
                    80%, 100% { opacity: 0; }
                }
                .animate-in {
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
};

export default TrackOrder;
