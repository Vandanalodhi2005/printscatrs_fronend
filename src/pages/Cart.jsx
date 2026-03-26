import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/actions/cartActions";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { FiTrash2, FiShoppingBag, FiTruck, FiShield, FiArrowRight, FiMinus, FiPlus } from "react-icons/fi";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const [giftWrap, setGiftWrap] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalWithGift = subtotal + (giftWrap ? 10 : 0);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=checkout');
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-12 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-[0.2em] text-[#0F3D91] uppercase bg-blue-50 rounded-full border border-blue-100">
                                    Inventory Management
                                </span>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">
                                    Shopping <span className="text-[#0F3D91]">Hub</span>
                                </h1>
                            </div>
                            <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm inline-flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-[#0F3D91]">
                                    <FiShoppingBag size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Items</p>
                                    <p className="font-black text-slate-900">{cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} Units</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 p-16 md:p-24 text-center border border-slate-50 flex flex-col items-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-8 border border-slate-100">
                                <FiShoppingBag size={48} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tighter">Your Manifest is Empty</h2>
                            <p className="text-slate-500 text-lg mb-10 max-w-sm leading-relaxed">
                                Ready to optimize your workflow? Browse our professional hardware collection to begin.
                            </p>
                            <Link 
                                to="/printers" 
                                className="inline-flex items-center gap-3 px-10 py-5 bg-[#0F3D91] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                            >
                                Browse Corporate Inventory <FiArrowRight />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Left: Cart Items Manifesto */}
                            <div className="lg:col-span-8 space-y-6">
                                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                                    {/* Desktop Table Header */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-slate-50/50 border-b border-slate-100">
                                        <div className="col-span-6 font-black text-[10px] text-slate-400 uppercase tracking-widest">Inventory Detail</div>
                                        <div className="col-span-2 text-center font-black text-[10px] text-slate-400 uppercase tracking-widest">Unit Price</div>
                                        <div className="col-span-2 text-center font-black text-[10px] text-slate-400 uppercase tracking-widest">Quantity</div>
                                        <div className="col-span-2 text-right font-black text-[10px] text-slate-400 uppercase tracking-widest">Action</div>
                                    </div>

                                    {/* Items List */}
                                    <div className="divide-y divide-slate-50">
                                        {cartItems.map((item) => (
                                            <div key={item.product} className="px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-slate-50/30 transition-colors">
                                                {/* Product Info */}
                                                <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                                                    <div className="w-24 h-24 bg-white border border-slate-100 rounded-2xl p-3 flex-shrink-0 group-hover:border-blue-100 transition-colors shadow-sm">
                                                        <img
                                                            src={item.image ? (item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${item.image}`) : "/placeholder.png"}
                                                            alt={item.title}
                                                            className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <Link to={`/product/${item.slug}`} className="text-lg font-extrabold text-slate-900 tracking-tight hover:text-[#0F3D91] transition-colors block truncate">
                                                            {item.title}
                                                        </Link>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Priority Stock</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="col-span-2 text-left md:text-center mt-2 md:mt-0">
                                                    <span className="md:hidden text-[10px] font-bold text-slate-400 uppercase block mb-1">Unit Price</span>
                                                    <p className="text-[#0F3D91] font-black text-lg tracking-tighter">${item.price.toLocaleString()}</p>
                                                </div>

                                                {/* Quantity Control */}
                                                <div className="col-span-2 flex justify-start md:justify-center">
                                                    <div className="inline-flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm h-11">
                                                        <button 
                                                            disabled={item.qty <= 1}
                                                            onClick={() => dispatch(addToCart(item.product, Math.max(1, Number(item.qty) - 1)))}
                                                            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 transition-colors disabled:opacity-20"
                                                        ><FiMinus size={14} /></button>
                                                        <span className="px-4 text-sm font-black text-slate-900 min-w-[40px] text-center">{item.qty}</span>
                                                        <button 
                                                            onClick={() => dispatch(addToCart(item.product, Math.min(item.countInStock || 99, Number(item.qty) + 1)))}
                                                            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 transition-colors"
                                                        ><FiPlus size={14} /></button>
                                                    </div>
                                                </div>

                                                {/* Delete Action */}
                                                <div className="col-span-2 text-right">
                                                    <button 
                                                        onClick={() => removeFromCartHandler(item.product)}
                                                        className="p-3 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Remove Item"
                                                    >
                                                        <FiTrash2 size={22} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Logistics Notice */}
                                <div className="bg-[#1E293B] rounded-3xl p-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-slate-200">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0">
                                        <FiTruck size={28} />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="font-black uppercase tracking-widest text-sm mb-1">Logistics Allocation</h4>
                                        <p className="text-slate-400 text-xs font-medium">Enjoy complimentary standard shipping on orders exceeding $500. Professional white-glove setup available at checkout.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Summary Order Intelligence */}
                            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-10 space-y-8 relative overflow-hidden group">
                                    {/* Subtle Gradient Accent */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100/50 transition-colors"></div>
                                    
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3 relative">
                                        <div className="w-2 h-6 bg-[#0F3D91] rounded-full"></div>
                                        Fiscal Intelligence
                                    </h3>
                                    
                                    <div className="space-y-4 relative">
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Subtotal</span>
                                            <span className="text-[#1E293B] font-black text-lg tracking-tighter">${subtotal.toLocaleString()}</span>
                                        </div>

                                        <div 
                                            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${giftWrap ? 'bg-blue-50 border-blue-100 ring-2 ring-blue-500/10' : 'bg-slate-50 border-slate-100 opacity-60'}`}
                                            onClick={() => setGiftWrap(!giftWrap)}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Premium Crating</span>
                                                <span className="text-xs font-black text-[#0F3D91]">$10.00</span>
                                            </div>
                                            <p className="text-[9px] font-medium text-slate-400">Reinforced protective packaging for heavy-duty transit.</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Invoice Total</span>
                                            <span className="text-4xl font-black text-[#0F3D91] tracking-tighter">${totalWithGift.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] text-center mt-4 flex items-center justify-center gap-2">
                                            <FiShield className="text-slate-200" /> End-to-End Secure Transaction
                                        </p>
                                    </div>

                                    <div className="space-y-4 pt-4 relative">
                                        <button 
                                            onClick={checkoutHandler}
                                            className="w-full bg-[#0F3D91] hover:bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] flex items-center justify-center gap-3"
                                        >
                                            Inaugurate Checkout <FiArrowRight />
                                        </button>
                                        
                                        <div className="flex items-center justify-center gap-6 pt-4">
                                            <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                                                <FiShield size={12} className="text-[#0F3D91]" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">PCI Compliant</span>
                                            </div>
                                            <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default text-[#0F3D91]">
                                                <span className="text-[8px] font-black uppercase tracking-widest">SSL Encrypted</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 bg-white/50 border border-slate-100 rounded-3xl p-6 text-center">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Enterprise Loyalty</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Manage your corporate account for bulk procurement and recurring ink supplies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <style>{`
                .animate-in {
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
};

export default Cart;
