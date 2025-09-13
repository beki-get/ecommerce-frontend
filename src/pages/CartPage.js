import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    if (couponCode === "SAVE10") setDiscount(0.1);
    else if (couponCode === "SAVE20") setDiscount(0.2);
    else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - subtotal * discount;

  if (!cartItems || cartItems.length === 0)
    return <p className="text-center mt-10 text-lg">🛒 Your cart is empty.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Cart</h1>

      {/* Cart Items Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow hover:shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              className="h-40 w-40 object-cover rounded mb-4"
            />

            <div className="text-center flex flex-col items-center flex-1">
              <h5 className="text-lg font-semibold mb-1 line-clamp-2">{item.name}</h5>
              <p className="text-blue-600 font-bold mb-2">${item.price.toFixed(2)}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mb-2">
                <button
                  className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="mt-3 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Coupon Section */}
      <div className="mt-8 max-w-md mx-auto">
        <h5 className="font-semibold mb-2">Apply Coupon</h5>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleApplyCoupon}
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-600 mt-2 font-medium">
            ✅ Coupon applied! You get {discount * 100}% off.
          </p>
        )}
      </div>

      {/* Totals */}
      <div className="mt-8 max-w-md mx-auto text-right">
        <h4 className="text-lg font-medium">Total Items: {totalItems}</h4>
        <h4 className="text-lg font-medium">Subtotal: ${subtotal.toFixed(2)}</h4>
        <h4 className="text-xl font-bold">Total: ${total.toFixed(2)}</h4>
        <button
          className="mt-4 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
