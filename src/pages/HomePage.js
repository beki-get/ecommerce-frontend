// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://ecommerce-ladv.onrender.com/api/products");
        setProducts(data);
        setFiltered(data);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let results = products;
    if (search)
      results = results.filter((p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase())
      );
    if (category !== "All") results = results.filter((p) => p.category === category);
    setFiltered(results);
    setCurrentPage(1);
  }, [search, category, products]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  if (loading) return <p className="text-center mt-20 text-lg">Loading products...</p>;
  if (error) return <p className="text-center mt-20 text-red-500 text-lg">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
  {/* Main Hero Card */}
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white shadow-xl border border-slate-800">
    
    {/* Subtle Tech-style Background Glows */}
    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

    <div className="relative z-10 px-6 py-12 md:py-16 lg:py-20 max-w-3xl mx-auto text-center">
      
      {/* Electronics Promo Tag */}
      <span className="inline-block bg-blue-500/20 backdrop-blur-md text-blue-300 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-blue-400/30 uppercase tracking-wider">
        ⚡ Next-Gen Tech Deals
      </span>

      {/* Main Electronics Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white">
        Upgrade Your Tech Setup
      </h1>

      {/* Subtitle / Value Proposition */}
      <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-normal">
        Discover top-quality smartphones, laptops, audio gear, and accessories. Save up to <strong className="text-blue-400 font-bold">50% off</strong> on selected items this week.
      </p>

      {/* Call To Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a 
          href="#products" 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transform active:scale-95 text-center"
        >
          Shop Tech Deals
        </a>
        <a 
          href="#categories" 
          className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold px-8 py-3.5 rounded-xl border border-slate-700 transition-all duration-200 text-center"
        >
          Browse Categories
        </a>
      </div>

    </div>
  </div>

  {/* Electronics Trust Badges */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-slate-700 text-center text-sm font-medium">
    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center gap-2">
      <span className="text-blue-600 font-bold">🚚</span> Fast & Safe Delivery
    </div>
    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center gap-2">
      <span className="text-blue-600 font-bold">💵</span> Cash on Delivery
    </div>
    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center gap-2">
      <span className="text-blue-600 font-bold">🛡️</span> Verified Quality & Support
    </div>
  </div>
</div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Category Highlights */}
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {["Smartphones", "Laptops", "Audio", "Televisions"].map((cat) => (
          <div
            key={cat}
            className="h-32 bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer hover:shadow-lg transition"
            onClick={() => setCategory(cat)}
          >
            <h3 className="text-xl font-semibold">{cat}</h3>
          </div>
        ))}
      </div>

      {/* All Products Section */}
      <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Laptops">Laptops</option>
          <option value="Televisions">Televisions</option>
          <option value="Audio">Audio</option>
        </select>
      </div>

      {/* Product Grid */}
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center flex-wrap gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === num + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default HomePage;
