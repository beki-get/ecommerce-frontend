// src/components/ProductCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const inWishlist = wishlist.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover cursor-pointer"
        />
       

      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h5 className="text-lg font-semibold mb-1">{product.name}</h5>
        <p className="text-blue-600 font-bold mb-2">${product.price}</p>

        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-yellow-400 ${i < Math.round(avgRating) ? "" : "opacity-40"}`}
            >
              ⭐
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-2">({product.reviews?.length || 0})</span>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            className={`flex-1 py-2 rounded ${
              inWishlist
                ? "bg-green-500 text-white hover:bg-green-600"
                : "border border-blue-500 text-blue-500 hover:bg-blue-50"
            } transition`}
            onClick={() => addToWishlist(product)}
          >
            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
          </button>

          <button
            className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        {added && (
          <div className="mt-2 p-2 text-center text-green-700 bg-green-100 rounded">
            Added to cart!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
