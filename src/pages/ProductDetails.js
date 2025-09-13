// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice", comment: "Great product!", rating: 5, date: "2025-08-22" },
    { id: 2, name: "Bob", comment: "Good value for money.", rating: 4, date: "2025-08-21" },
  ]);

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const inWishlist = wishlist.some((item) => item._id === id);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://ecommerce-ladv.onrender.com/api/products/${id}`);
        setProduct(data);
        setMainImage(data.image);
      } catch {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddReview = () => {
    if (!reviewText.trim()) return;
    const newReview = {
      id: Date.now(),
      name: "You",
      comment: reviewText,
      rating: reviewRating,
      date: new Date().toLocaleDateString(),
    };
    setReviews([newReview, ...reviews]);
    setReviewText("");
    setReviewRating(5);
  };

  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  if (loading) return <p className="text-center mt-10">Loading product details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="md:w-1/2">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div className="flex gap-2 mt-3 flex-wrap">
            {[product.image, ...(product.images || [])]
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx}`}
                  className="w-16 h-16 object-cover rounded cursor-pointer border hover:border-blue-500"
                  onClick={() => setMainImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col">
          <h2 className="text-2xl font-semibold mb-1">{product.name}</h2>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <p className="text-blue-600 font-bold text-xl mb-3">${product.price}</p>
          <p className="mb-4">{product.description}</p>

          <div className="flex gap-3 mb-5">
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
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Reviews</h3>

            {/* Average Rating */}
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-yellow-400 ${i < Math.round(averageRating) ? "" : "opacity-40"}`}
                >
                  ⭐
                </span>
              ))}
              <span className="text-gray-500 text-sm ml-2">
                ({reviews.length} reviews)
              </span>
            </div>

            {/* Add Review Form */}
            <div className="mb-4 flex flex-col gap-2">
              <textarea
                className="border rounded p-2 w-full"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <select
                className="border rounded p-2 w-32"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <button
                className="py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-32"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>

            {/* Display Reviews */}
            {reviews.length === 0 && <p>No reviews yet.</p>}
            <ul className="flex flex-col gap-3">
              {reviews.map((rev) => (
                <li
                  key={rev.id}
                  className="border rounded p-3 bg-gray-50 shadow-sm"
                >
                  <div className="flex items-center mb-1">
                    <strong className="mr-2">{rev.name}</strong>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-yellow-400 ${i < rev.rating ? "" : "opacity-40"}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-1">{rev.comment}</p>
                  <small className="text-gray-400">{rev.date}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
