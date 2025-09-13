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
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center rounded-lg mb-12">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Big Sale This Week!</h1>
          <p className="text-lg md:text-xl mb-4">Up to 50% off on selected items</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
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
        {["Electronics", "Fashion", "Books", "Home"].map((cat) => (
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
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
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
