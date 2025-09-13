// src/pages/WishlistPage.js
import React from "react";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto p-4 mt-10 text-center">
        <h3 className="text-xl font-semibold">Your wishlist is empty ❤️</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist ❤️</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h5 className="text-lg font-semibold mb-2">{item.name}</h5>
              <p className="text-gray-700 mb-4">${item.price.toFixed(2)}</p>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="mt-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
