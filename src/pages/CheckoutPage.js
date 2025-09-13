// src/pages/CheckoutPage.js
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  
  const { cartItems, clearCart, totalPrice } = useCart();
  const { addOrder } = useOrders();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({ street: "", city: "", zip: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!user || !token) {
      setError("You must be logged in to place an order.");
      return;
    }

    if (!address.street || !address.city || !address.zip) {
      setError("Please fill in all address fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      /*// Sync cart to backend
      for (const item of cartItems) {
        const product = item.productId || item;
        await axios.post(
          "/api/cart/add",
          { productId: product._id, quantity: item.quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }*/

      // Place order
      const { data } = await axios.post(
        //changed
        "https://ecommerce-ladv.onrender.com/api/checkout",
        { address, paymentMethod,  items: cartItems.map(item => ({
      productId: item.productId?._id || item._id, // Send only the ID
      quantity: item.quantity
    }))},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");

      clearCart();
      if (addOrder) addOrder(data.order || data);
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center mt-5 text-lg">🛒 Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Address Form */}
      <div className="border p-4 rounded mb-6 space-y-2">
        <h2 className="font-semibold text-lg">Shipping Address</h2>
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip / Postal Code"
          value={address.zip}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      {/* Payment Options */}
      <div className="border p-4 rounded mb-6 space-y-2">
        <h2 className="font-semibold text-lg">Payment Method</h2>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Card Payment (Test)</span>
        </label>
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded mb-6 space-y-2">
        <h2 className="font-semibold text-lg">Order Summary</h2>
        {cartItems.map((item, index) => {
          const product = item.productId || item;
          return (
            <div key={product._id || `item-${index}`} className="flex justify-between">
              <span>{product.name} x {item.quantity}</span>
              <span>${(product.price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;
