import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import { listCategories } from '../redux/actions/categoryActions';
import { addToCart } from '../redux/actions/cartActions';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { useCart } from '../context/CartContext';
import { Eye, ShoppingBag } from 'lucide-react';
import HomeProductCard from '../components/home/HomeProducts/HomeProductCard';
import '../styles/pages.css';

const InkToner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page: reduxPage, pages: totalPages } = productList;

  // Clear products on mount to prevent old state
  useEffect(() => {
     return () => {
         setAllProducts([]);
     }
  }, []);

  // Use 'Ink & Toner' as default category if not specified
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Ink & Toner');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  // Increased max price range to ensure all products are visible by default
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  
  // Local state
  const [allProducts, setAllProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const { addToCart: contextAddToCart } = useCart();

  const categoryListState = useSelector((state) => state.categoryList);
  const { categories: allCategories } = categoryListState || {};

  // Filter categories to only matching "Ink" or "Toner" but exclude "Printer"
  const relevantCategories = useMemo(() => {
    if (!allCategories) return [];
    return allCategories.filter(c => 
      /Ink|Toner/i.test(c.name) && !/Printer/i.test(c.name)
    ).map(c => ({ id: c.name, label: c.name })); // Use name as ID since backend lookup expects name
  }, [allCategories]);

  useEffect(() => {
      dispatch(listCategories());
  }, [dispatch]);

  // Sync state with URL params changes
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
        setSelectedCategory(catParam);
    } else if (relevantCategories.length > 0) {
        // If current selection is not found in loaded categories, default to 'Ink & Toner' or first available
        const exists = relevantCategories.find(c => c.id === selectedCategory);
        if (!exists) {
            const defaultCat = relevantCategories.find(c => c.id === 'Ink & Toner');
            setSelectedCategory(defaultCat ? defaultCat.id : relevantCategories[0].id);
        }
    }
  }, [searchParams, relevantCategories, selectedCategory]);

  useEffect(() => {
     const searchParam = searchParams.get('search');
     setSearchQuery(searchParam || '');
  }, [searchParams]);

  // Initial Fetch & Reset on Filter Change
  useEffect(() => {
     // Reset local state
     setAllProducts([]);
     setCurrPage(1);
     
     // Fetch products based on category and brand
     // If we have categories, ensure selectedCategory is valid or at least passed
     if (selectedCategory) {
         dispatch(listProducts(searchQuery, selectedCategory, 1, selectedBrand));
     }
  }, [dispatch, selectedCategory, searchQuery, selectedBrand]);

  // Handle Accumulation
  useEffect(() => {
    // Only update if we have new products and not in loading state (unless it's a fresh load)
    if (products && Array.isArray(products) && !loading) {
        if (reduxPage === 1) {
            setAllProducts(products);
        } else if (reduxPage > 1) {
            setAllProducts(prev => {
                // Prevent duplicates
                const existingIds = new Set(prev.map(p => p._id));
                const uniqueNew = products.filter(p => !existingIds.has(p._id));
                return [...prev, ...uniqueNew];
            });
        }
    }
  }, [products, reduxPage, loading]);

  const handleLoadMore = () => {
      // Ensure we don't fetch if already loading or at end
      const maxPages = totalPages || 1;
      if (currPage < maxPages && !loading) {
          const nextPage = currPage + 1;
          setCurrPage(nextPage);
          dispatch(listProducts(searchQuery, selectedCategory, nextPage, selectedBrand));
      }
  };

  const handleCategoryClick = (catId) => {
      setSelectedCategory(catId);
      // Update URL without reloading
      setSearchParams({ category: catId });
  };

  const uniqueBrands = useMemo(() => {
      // User requested explicit list: HP, Canon, Brother, Epson. Removed Samsung.
      const hardcodedBrands = ['HP', 'Canon', 'Brother', 'Epson'];
      
      return hardcodedBrands;
  }, []);

  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product.slug || product._id, 1));
    navigate('/cart?redirect=shipping');
  };

  const handleDetails = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.slug || product._id}`);
  };

  // Filter and sort logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts || [];

    // Client-side Brand filter removed as we now filter on backend
    // But keeping safeguard just in case of mixed results if needed, 
    // though backend filtering is cleaner.
    // If backend works, this is redundant but harmless unless backend fails.
    // Let's rely on backend result.
    
    // Price range filter
    filtered = filtered.filter(p =>
      p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [allProducts, priceRange, sortBy]);

  return (
    <>
      <Navbar />
      <div className="ink-toner-page bg-slate-50 min-h-screen">
        <div className="printers-container mx-auto max-w-7xl px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Ink & Toner</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Premium quality ink and toner for all your printing needs.
            </p>
          </div>

          {/* Filters Top Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 mb-8 flex flex-col md:flex-row items-center gap-4 shadow-sm transition-shadow duration-300">
             
             {/* Category Filter Buttons */}
             <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                {relevantCategories && relevantCategories.length > 0 ? (
                    relevantCategories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                selectedCategory === cat.id 
                                ? 'bg-blue-900 text-white shadow-md transform scale-105' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))
                ) : (
                    <span className="text-sm text-slate-400 italic px-2">
                        {categoryListState?.loading ? "Loading categories..." : "No ink/toner categories found."}
                    </span>
                )}
             </div>

             {/* Search */}
             <div className="flex-1 w-full relative">
                <input
                    type="text"
                    placeholder="Search ink or toner..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                />
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>

             {/* Sort & Price Filter */}
             <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                 {/* Brand Filter */}
                 <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors capitalize"
                 >
                    <option value="all">All Brands</option>
                    {uniqueBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                 </select>

                 <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                 >
                    <option value="featured">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                 </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count mb-4 flex justify-between items-center">
            <p className="text-slate-500 font-medium text-sm">
              Showing <strong>{filteredAndSortedProducts.length}</strong> items
            </p>
          </div>

          {/* Grid - Responsive: 1(mobile), 2(sm), 3(md+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-8">
            {filteredAndSortedProducts.map((product, index) => (
              <HomeProductCard 
                key={product._id || index} 
                product={product} 
                handleDetails={handleDetails} 
                handleBuyNow={handleBuyNow} 
              />
            ))}
          </div>

          {/* Loading State or No Products */}
          {loading && currPage === 1 && (
             <div className="flex justify-center py-12">
                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
             </div>
          )}

          {!loading && filteredAndSortedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-4">
                <circle cx="32" cy="32" r="30" stroke="#e0e0e0" strokeWidth="2" />
                <path d="M32 20V32M32 36H32.01" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 className="text-lg font-bold text-slate-700">No products found</h3>
              <p className="text-slate-500">Try adjusting your filters, category or search query</p>
            </div>
          )}
          
          {/* Load More Trigger */}
          {products && products.length > 0 && currPage < totalPages && !loading && (
              <div className="flex justify-center pt-8">
                  <button 
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                  >
                      Load More Products
                  </button>
              </div>
          )}
      
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InkToner;
