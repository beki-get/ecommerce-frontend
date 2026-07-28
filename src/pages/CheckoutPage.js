import React, { useState, useEffect } from "react";
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!address.street || !address.city || !address.zip) {
      setError("Please fill in all address fields.");
      return false;
    }
    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty. Please add items before checkout.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare cart items with proper product ID extraction
      const items = cartItems.map((item) => {
        let productId;
        if (item.productId && typeof item.productId === "object") {
          productId = item.productId._id;
        } else if (item.productId && typeof item.productId === "string") {
          productId = item.productId;
        } else {
          productId = item._id;
        }

        return {
          productId,
          quantity: item.quantity,
        };
      });

      // Place order request
      const { data } = await axios.post(
        "https://ecommerce-ladv.onrender.com/api/checkout",
        {
          address,
          paymentMethod,
          items,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ONLINE PAYMENT FLOW (CHAPA)
      if (paymentMethod === "chapa" && data.checkout_url) {
        // Redirect user directly to Chapa hosted payment page
        window.location.href = data.checkout_url;
        return;
      }

      // CASH ON DELIVERY (COD) FLOW
      clearCart();
      if (addOrder) {
        addOrder(data.order || data);
      }

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to place order. Please try again.";
      setError(errorMessage);
      console.error("Checkout Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !token) {
    return null; // Will redirect via useEffect
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center mt-5 text-lg">🛒 Your cart is empty.</p>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Address Form */}
      <div className="border p-4 rounded mb-6 space-y-2">
        <h2 className="font-semibold text-lg">Shipping Address</h2>
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip / Postal Code"
          value={address.zip}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Payment Options */}
      <div className="border p-4 rounded mb-6 space-y-2">
        <h2 className="font-semibold text-lg">Payment Method</h2>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="chapa"
            checked={paymentMethod === "chapa"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Pay Online (Telebirr, CBE Birr, Cards via Chapa)</span>
        </label>
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded mb-6 space-y-2">
        <h2 className="font-semibold text-lg">Order Summary</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {cartItems.map((item, index) => {
            const product = item.productId || item;
            const productName = product.name || "Product";
            const productPrice = product.price || 0;

            return (
              <div key={product._id || `item-${index}`} className="flex justify-between text-gray-700">
                <span className="line-clamp-1">
                  {productName} x {item.quantity}
                </span>
                <span className="font-medium whitespace-nowrap ml-2">
                  ${(productPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between font-bold mt-4 pt-4 border-t">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition"
        >
          Back to Cart
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading 
            ? "Processing..." 
            : paymentMethod === "chapa" 
            ? "Proceed to Pay with Chapa" 
            : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
