import { useState, useEffect, useRef } from "react"; // eslint-disable-line no-unused-vars
import { useParams, Link, useNavigate } from "react-router-dom"; // eslint-disable-line no-unused-vars
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { 
  listProductDetails, 
  listProducts,
  createProductReview, 
  updateProductReview, 
  deleteProductReview 
} from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { 
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_UPDATE_REVIEW_RESET // eslint-disable-line no-unused-vars
} from "../redux/constants/productConstants";
import { ShoppingCart, CreditCard } from 'lucide-react';

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const optimizeCloudinaryUrl = (url, width = 800) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width},c_limit,q_auto,f_auto/`);
  };

  const productList = useSelector((state) => state.productList);
  const { products: relatedProducts } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("overview");

  // Review State & Selectors
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [showEligibilityToast, setShowEligibilityToast] = useState(false);
  
  // Toaster State
  const [showLoginToast, setShowLoginToast] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userHasReviewed = product?.reviews?.some((r) => r.user === userInfo?._id);

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    if (product && product.category) {
        const categoryName = product.category.name || product.category;
        dispatch(listProducts('', categoryName, 1));
    }
    
    const checkEligibility = async () => {
        if (userInfo && product && product._id) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/orders/check-review-eligibility/${product._id}`,
                    config
                );
                setCanReview(data.canReview);
            } catch (error) {
                console.error("Error checking review eligibility", error);
                setCanReview(false);
            }
        }
    };
    checkEligibility();

  }, [dispatch, product, userInfo]);

  useEffect(() => {
    if (successProductReview) {
        setRating(0);
        setComment("");
        setEditingReviewId(null);
        setShowReviewForm(false);
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        if(slug) dispatch(listProductDetails(slug));
    }
  }, [successProductReview, slug, dispatch]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (editingReviewId) {
       dispatch(updateProductReview(product._id, { rating, comment, reviewId: editingReviewId }));
       setEditingReviewId(null);
    } else {
       dispatch(createProductReview(product._id, { rating, comment }));
    }
  };

  const deleteReviewHandler = (reviewId) => {
      if(window.confirm('Are you sure you want to delete this review?')) {
          dispatch(deleteProductReview(product._id, reviewId));
          // Optimistic update or wait for success - for simplicity let's rely on refetch if success action triggers
          // But here, triggering listProductDetails on successDelete would be best.
          // Adding a small timeout to refetch or listening to DELETE_SUCCESS in useEffect would be better
          setTimeout(() => { if(slug) dispatch(listProductDetails(slug)) }, 1000); 
      }
  };

  const startEditReview = (review) => {
      setRating(review.rating);
      setComment(review.comment);
      setEditingReviewId(review._id);
      window.scrollTo({ top: document.querySelector('.tabs-container').offsetTop, behavior: 'smooth' });
  };
const handleReviewClick = () => {
    if (showReviewForm) {
      setShowReviewForm(false);
      return;
    }
    
    if (canReview) {
      setShowReviewForm(true);
    } else {
      setShowEligibilityToast(true);
      setTimeout(() => setShowEligibilityToast(false), 3000);
    }
  };

  
  // Zoom state
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (slug) dispatch(listProductDetails(slug));
    window.scrollTo(0, 0); // Scroll to top on load
  }, [dispatch, slug]);

  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
  }, [product]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
           <div className="spinner"></div>
           <p>Loading Product Details...</p>
        </div>
        <Footer />
        <style>{`
          .loading-container { padding-top: 120px; padding-bottom: 100px; text-align: center; min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0f3d91; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh" }}>
          <h2>Product not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];
  
  const activeImgSrc = images[activeImageIndex];

  const handleAddToCart = () => {
    if (!userInfo) {
       setShowLoginToast(true);
       setTimeout(() => setShowLoginToast(false), 3000);
       return;
    }
    dispatch(addToCart(product.slug || product._id, qty));
    // Optional feedback like smarteprinting redirect to cart
    navigate('/cart');
  };

  const buyNowHandler = () => {
      if (!userInfo) {
        setShowLoginToast(true);
        setTimeout(() => setShowLoginToast(false), 3000);
        return;
      }
      dispatch(addToCart(product.slug || product._id, qty));
      navigate('/cart?redirect=shipping');
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      <Navbar />

      {showEligibilityToast && (
        <div className="fixed top-24 right-5 bg-orange-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-fade-in-down">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-bold">Verification Failed</h4>
            <p className="text-sm">Please purchase and receive this item to review.</p>
          </div>
        </div>
      )}

      {/* Login Toast Notification */}
      {showLoginToast && (
        <div className="fixed top-24 right-5 bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-fade-in-down">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-bold">Access Denied</h4>
            <p className="text-sm">Please login to add items to cart</p>
          </div>
        </div>
      )}

      <div className="pd-wrapper">
        <div className="pd-layout">
          
          {/* THUMBNAILS */}
          <div className="pd-thumbs">
            {images.map((img, i) => (
              <img
                key={i}
                src={optimizeCloudinaryUrl(img, 200)}
                className={i === activeImageIndex ? "active" : ""}
                onMouseEnter={() => setActiveImageIndex(i)}
                onClick={() => setActiveImageIndex(i)}
                alt={`${product.title} view ${i + 1}`}
              />
            ))}
          </div>

          {/* MAIN IMAGE CONTAINER */}
          <div className="pd-image-container">
            <div 
                className="pd-image-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
            >
              <img 
                src={optimizeCloudinaryUrl(activeImgSrc, 1200)} 
                alt={product.title} 
                style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isHovered ? "scale(1.6)" : "scale(1)",
                }}
              />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="pd-info">
            <span className="brand">{product.brand}</span>
            <h1>{product.title || product.name}</h1>

             {/* HIGHLIGHTS */}
             {product.shortDetails && (
              <div className="key-specs">
                <h4>Highlights</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.shortDetails,
                  }}
                />
              </div>
            )}

            <div className="rating-summary">
                 <span className="stars">{"⭐".repeat(Math.round(product.rating || 0))}</span>
                 <span className="rating-count">({product.numReviews || 0} reviews)</span>
            </div>

            <div className="price-section">
                <span className="price">${product.price?.toFixed(2)}</span>
                {product.oldPrice && (
                    <span className="old-price">${product.oldPrice.toFixed(2)}</span>
                )}
                {product.countInStock > 0 ? (
                    <span className="stock-status in-stock">In Stock</span>
                ) : (
                    <span className="stock-status out-stock">Out of Stock</span>
                )}
            </div>

            {/* QUANTITY */}
            {product.countInStock > 0 && (
              <div className="qty-picker">
                <span className="qty-label">Quantity:</span>
                <div className="qty-controls">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>−</button>
                  <input type="text" readOnly value={qty} />
                  <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} disabled={qty >= product.countInStock}>+</button>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="actions">
              <button
                className="btn-cart"
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
              >
                <ShoppingCart size={20} strokeWidth={2.5} />
                {product.countInStock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
              </button>
              <button 
                className="btn-buy" 
                disabled={product.countInStock === 0}
                onClick={buyNowHandler}
              >
                <CreditCard size={20} strokeWidth={2.5} />
                BUY NOW
              </button>
            </div>


          </div>
        </div>

        {/* TABS SECTION */}
   {/* TABS SECTION */}
<div className="mt-20 border-t border-slate-200 pt-10">
  {/* TAB HEADER */}
  <div className="flex gap-10 border-b border-slate-200 mb-10 overflow-x-auto">
    {["overview", "specs", "reviews"].map((t) => (
      <button
        key={t}
        onClick={() => setTab(t)}
        className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-4 transition-all whitespace-nowrap
          ${
            tab === t
              ? "text-blue-900 border-blue-900"
              : "text-slate-400 border-transparent hover:text-slate-600"
          }`}
      >
        {t === "specs" ? "Specifications" : t}
      </button>
    ))}
  </div>

  {/* TAB CONTENT */}
  <div className="w-full">
    {/* OVERVIEW */}
    {tab === "overview" && (
      <div className="prose max-w-none animate-fadeIn">
        {product.overview ? (
          <div dangerouslySetInnerHTML={{ __html: product.overview }} />
        ) : (
          <p>{product.description}</p>
        )}
      </div>
    )}

    {/* SPECS */}
    {tab === "specs" && (
      <div className="animate-fadeIn">
        {product.technicalSpecification ? (
          <div 
            dangerouslySetInnerHTML={{ __html: product.technicalSpecification }} 
            className="html-content text-slate-700"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 rounded-xl overflow-hidden">
              <tbody>
                {[
                  { l: "Brand", v: product.brand },
                  { l: "Category", v: product.category?.name || product.category },
                  { l: "Color", v: product.color },
                  { l: "Screen Size", v: product.screenSize },
                  { l: "Width", v: product.width },
                  { l: "Height", v: product.height },
                  { l: "Depth", v: product.depth },
                ]
                  .filter((row) => row.v)
                  .map((row, i) => (
                    <tr key={i} className="even:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-600 w-1/3">
                        {row.l}
                      </td>
                      <td className="px-6 py-4 text-slate-800">{row.v}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )}

    {/* REVIEWS */}
    {tab === "reviews" && (
      <div className="animate-fadeIn space-y-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-6">
          <div>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="text-yellow-400">
                {"★".repeat(Math.round(product.rating || 0))}
              </div>
              <span className="text-sm text-slate-500">
                {product.rating?.toFixed(1) || "0.0"} / 5
              </span>
            </div>
          </div>

          {userInfo ? (
            !userHasReviewed ? (
                <button
                    onClick={handleReviewClick}
                    className="px-6 py-3 border-2 border-slate-900 rounded-xl font-bold text-xs uppercase hover:bg-slate-900 hover:text-white transition"
                >
                    {showReviewForm ? "Cancel" : "Write Review"}
                </button>
            ) : (
                <div className="px-6 py-3 border border-emerald-100 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-wider">
                    Feedback shared
                </div>
            )
          ) : (
            <Link
              to="/signin"
              className="px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-xs uppercase text-slate-400 hover:text-slate-900"
            >
              Sign in to Review
            </Link>
          )}
        </div>

        {/* REVIEW FORM */}
        {(showReviewForm || editingReviewId) && (
          <form
            onSubmit={submitReviewHandler}
            className="bg-slate-50 p-6 rounded-2xl border space-y-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase mb-2">
                Rating
              </label>
              <div className="flex gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      rating >= star
                        ? "text-yellow-400"
                        : "text-slate-300 hover:text-yellow-200"
                    }
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-xl border focus:border-slate-900"
              placeholder="Write your review..."
              required
            />

            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase">
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
          </form>
        )}

        {/* REVIEW LIST */}
        {product.reviews?.length > 0 ? (
          <div className="space-y-8 max-w-4xl">
            {product.reviews.map((r) => (
              <div key={r._id} className="border-b pb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold">
                      {r.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-bold uppercase text-sm">
                        {r.name || "Anonymous"}
                      </p>
                      <div className="text-yellow-400 text-xs">
                        {"★".repeat(r.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {r.createdAt?.substring(0, 10)}
                  </span>
                </div>

                <p className="text-slate-600 italic pl-14">
                  “{r.comment}”
                </p>

                {userInfo && r.user === userInfo._id && (
                  <div className="pl-14 mt-3 flex gap-4 text-xs font-bold uppercase">
                    <button
                      onClick={() => startEditReview(r)}
                      className="hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteReviewHandler(r._id)}
                      className="text-rose-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 uppercase text-xs">
            No reviews yet
          </p>
        )}
      </div>
    )}
  </div>
</div>

        {/* RELATED PRODUCTS */}
        {relatedProducts && relatedProducts.length > 0 && (
           <div className="related-section">
              <h2 className="related-title">You Might Also Like</h2>
              <div className="related-grid">
                 {relatedProducts.filter(p => p._id !== product._id).slice(0, 4).map(p => (
                    <Link to={`/product/${p.slug || p._id}`} key={p._id} className="related-card" onClick={() => window.scrollTo(0,0)}>
                        <div className="related-img-box">
                             <img src={optimizeCloudinaryUrl(p.image || (p.images && p.images[0]), 300)} alt={p.name} />
                        </div>
                        <div className="related-info">
                            <h4>{p.name}</h4>
                            <span className="related-price">${p.price?.toFixed(2)}</span>
                        </div>
                    </Link>
                 ))}
              </div>
           </div>
        )}

        {/* CSS STYLES */}
        <style>{`
          .pd-wrapper { padding: 10px 20px 40px; max-width: 1400px; margin: 0 auto; font-family: 'Inter', sans-serif; color: #333; }
          
          /* LAYOUT */
          .pd-layout { display: grid; grid-template-columns: 100px 1fr 400px; gap: 40px; position: relative; }
          
          /* THUMBNAILS */
          .pd-thumbs { 
            display: flex; 
            flex-direction: column; 
            gap: 12px; 
            max-height: 500px; 
            overflow-y: auto; 
            scrollbar-width: none; 
            -ms-overflow-style: none;
          }
          .pd-thumbs::-webkit-scrollbar { display: none; }
          
          .pd-thumbs img {
            width: 80px; height: 80px; object-fit: contain; cursor: pointer;
            border: 2px solid #f1f5f9; border-radius: 12px; transition: all 0.2s;
            background: white; padding: 5px;
          }
          .pd-thumbs img:hover, .pd-thumbs img.active { border-color: #0f3d91; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

          /* MAIN IMAGE CONTAINER */
          .pd-image-container { position: relative; z-index: 10; height: 600px; }
          
          .pd-image-wrapper {
            width: 100%; height: 100%;
            background: #fff;
            border-radius: 20px;
            /* box-shadow: 0 10px 30px rgba(0,0,0,0.05); */
            border: 1px solid #f1f5f9;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden;
            position: relative;
            cursor: crosshair;
          }
          
          .pd-image-wrapper img {
            max-width: 90%; max-height: 90%;
            object-fit: contain;
            transition: transform 0.1s ease-out; /* Smooth follow */
          }

          /* PRODUCT INFO */
          .pd-info { padding: 10px; }
          .brand { font-size: 13px; font-weight: 700; color: #0f3d91; text-transform: uppercase; letter-spacing: 1px; }
          .pd-info h1 { margin: 8px 0 16px; font-size: 32px; line-height: 1.2; color: #1e293b; font-weight: 800; }
          
          /* Key Specs section */
          .key-specs { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; font-size: 14px; color: #475569; }
          .key-specs h4 { margin: 0 0 12px; font-size: 12px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; font-weight: 700; }
          .key-specs ul { padding-left: 18px; margin: 0; }
          .key-specs li { margin-bottom: 6px; }

          .rating-summary { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; font-size: 14px; }
          .stars { color: #fbbf24; letter-spacing: 2px; }
          .rating-count { color: #94a3b8; font-weight: 500; }

          .price-section { margin-bottom: 30px; display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; }
          .price { font-size: 36px; font-weight: 800; color: #0f172a; }
          .old-price { font-size: 20px; color: #94a3b8; text-decoration: line-through; }
          .stock-status { font-size: 12px; font-weight: 700; text-transform: uppercase; padding: 6px 10px; border-radius: 6px; letter-spacing: 0.5px; }
          .in-stock { background: #dcfce7; color: #15803d; }
          .out-stock { background: #fee2e2; color: #b91c1c; }

          .qty-picker { margin-bottom: 30px; }
          .qty-label { display: block; margin-bottom: 10px; font-weight: 600; font-size: 14px; color: #475569; }
          .qty-controls { display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 10px; width: fit-content; overflow: hidden; }
          .qty-controls button { width: 44px; height: 44px; background: white; border: none; font-size: 18px; cursor: pointer; transition: background 0.2s; color: #333; }
          .qty-controls button:hover:not(:disabled) { background: #f8fafc; }
          .qty-controls button:disabled { color: #cbd5e1; cursor: not-allowed; }
          .qty-controls input { width: 60px; text-align: center; border: none; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; height: 44px; font-weight: 700; font-size: 16px; color: #0f172a; }

          .actions { display: flex; gap: 16px; margin-bottom: 40px; }
          .actions button { 
             flex: 1; 
             height: 56px; 
             border-radius: 12px; 
             font-weight: 700; 
             font-size: 14px; 
             letter-spacing: 0.5px; 
             cursor: pointer; 
             transition: all 0.2s ease; 
             text-transform: uppercase; 
             display: flex; 
             align-items: center; 
             justify-content: center; 
             gap: 10px; 
          }
          .actions button:active { transform: scale(0.98); }
          
          /* Dark Button (Add to Cart) */
          .btn-cart { 
             background: white; 
             border: 2px solid #e2e8f0; 
             color: #1e293b; 
          }
          .btn-cart:hover { 
             border-color: #1e293b;
             background: #f8fafc;
             color: #0f172a;
          }
          
          /* Brand Button (Buy Now) */
          .btn-buy { 
             background: #0f3d91; 
             border: 2px solid #0f3d91; 
             color: white; 
             box-shadow: 0 4px 6px -1px rgba(15, 61, 145, 0.2); 
          }
          .btn-buy:hover { 
             background: #0a2a66; 
             border-color: #0a2a66; 
             box-shadow: 0 10px 15px -3px rgba(15, 61, 145, 0.3); 
             transform: translateY(-1px);
          }
          
          .btn-cart:disabled, .btn-buy:disabled { 
             border-color: #f1f5f9; 
             background: #f1f5f9; 
             color: #cbd5e1; 
             cursor: not-allowed; 
             box-shadow: none; 
             transform: none; 
          }

          /* TABS */
          .tabs-container { margin-top: 80px; border-top: 1px solid #e2e8f0; padding-top: 40px; }
          .tab-header { display: flex; gap: 40px; border-bottom: 1px solid #e2e8f0; margin-bottom: 40px; overflow-x: auto; padding-bottom: 1px; }
          .tab-header button { padding: 0 0 16px 0; background: none; border: none; font-weight: 700; color: #94a3b8; border-bottom: 3px solid transparent; cursor: pointer; white-space: nowrap; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s; }
          .tab-header button:hover { color: #475569; }
          .tab-header button.active { color: #0f3d91; border-bottom-color: #0f3d91; }
          
          .tab-content { min-height: 200px; color: #334155; line-height: 1.8; font-size: 16px; }
          
          /* CONTENT STYLES (Overview/HTML) */
          .html-content p { margin-bottom: 1.5em; }
          .html-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: block; }
          .html-content ul, .html-content ol { margin: 1.5em 0; padding-left: 2em; }
          .html-content li { margin-bottom: 0.5em; }
          .html-content h2 { font-size: 24px; font-weight: 700; color: #1e293b; margin: 2em 0 1em; }
          .html-content h3 { font-size: 20px; font-weight: 600; color: #334155; margin: 1.5em 0 0.8em; }
          .html-content blockquote { border-left: 4px solid #0f3d91; padding-left: 20px; color: #475569; font-style: italic; margin: 20px 0; background: #f8fafc; padding: 16px 20px; border-radius: 0 8px 8px 0; }
          
          .specs-table { width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
          .specs-table tr:nth-child(even) { background: #f8fafc; }
          .specs-table td { padding: 16px 24px; border-bottom: 1px solid #e2e8f0; }
          .specs-table td:first-child { font-weight: 600; width: 250px; color: #475569; background: #fff; }

          /* REVIEWS */
          .reviews-list { display: grid; gap: 24px; }
          .review-card { background: #fff; padding: 24px; border-radius: 16px; display: flex; gap: 20px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); align-items: flex-start; }
          .review-avatar { width: 48px; height: 48px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #64748b; font-size: 18px; flex-shrink: 0; }
          .review-content { flex: 1; }
          .review-author { font-weight: 700; margin-bottom: 4px; color: #1e293b; font-size: 16px; }
          .review-stars { font-size: 14px; margin-bottom: 10px; display: block; letter-spacing: 1px; }
          .review-text { font-size: 15px; color: #475569; line-height: 1.6; }
          
          .no-reviews { text-align: center; padding: 60px 20px; background: #f8fafc; border-radius: 16px; border: 1px dashed #cbd5e1; }
          .no-reviews-icon { display: block; font-size: 40px; margin-bottom: 16px; opacity: 0.5; }
          .no-reviews p { color: #64748b; font-size: 16px; margin-bottom: 24px; font-weight: 500; }
          .btn-write-review { background: #fff; border: 2px solid #0f3d91; color: #0f3d91; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; }
          .btn-write-review:hover { background: #f0f7ff; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(15, 61, 145, 0.1); }


          /* RELATED PRODUCTS */
          .related-section { margin-top: 80px; padding-top: 40px; border-top: 1px solid #e2e8f0; }
          .related-title { font-size: 24px; font-weight: 800; color: #1e293b; margin-bottom: 32px; text-transform: uppercase; letter-spacing: -0.5px; }
          .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
          .related-card { display: block; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; transition: all 0.2s; text-decoration: none; }
          .related-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); border-color: #cbd5e1; }
          .related-img-box { height: 240px; padding: 20px; background: #f8fafc; display: flex; align-items: center; justify-content: center; }
          .related-img-box img { max-width: 100%; max-height: 100%; object-fit: contain; mix-blend-mode: multiply; }
          .related-info { padding: 20px; }
          .related-info h4 { font-size: 15px; font-weight: 700; color: #334155; margin-bottom: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .related-price { font-size: 16px; font-weight: 800; color: #0f3d91; }

          /* RESPONSIVE */
          @media (max-width: 1024px) {
            .pd-wrapper { padding-top: 10px; }
            .pd-layout { grid-template-columns: 1fr; gap: 30px; }
            
            .pd-image-container { order: 1; height: 450px; }
            .pd-thumbs { order: 2; flex-direction: row; width: 100%; max-height: auto; overflow-x: auto; padding-bottom: 10px; gap: 10px; }
            .pd-thumbs::-webkit-scrollbar { display: none; }
            .pd-info { order: 3; }
            
            /* Disable zoom on touch devices */
            .pd-image-wrapper img { transform: none !important; }
            /* .actions { flex-direction: column; } Removed to keep side-by-side */
          }
          
          @media (max-width: 600px) {
             .review-card { flex-direction: column; gap: 12px; }
             .review-avatar { width: 40px; height: 40px; font-size: 16px; }
             /* Stack buttons only on very small screens if needed, otherwise share width */
             .actions { margin-bottom: 24px; gap: 12px; }
             .actions button { height: 48px; font-size: 13px; padding: 0 10px; }
          }
          
          @media (max-width: 480px) {
             .pd-wrapper { padding: 90px 16px 40px; }
             .pd-image-container { height: 350px; }
             .price { font-size: 30px; }
             .pd-info h1 { font-size: 26px; }
             .tab-header { gap: 24px; }
          }
        `}</style>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
