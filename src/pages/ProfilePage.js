// src/pages/ProfilePage.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const [address, setAddress] = useState(
    localStorage.getItem("address") || "Add your shipping address"
  );
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("paymentMethod") || "Cash on Delivery"
  );
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem("address", address);
    localStorage.setItem("paymentMethod", paymentMethod);
    setEditing(false);
    alert("Profile updated successfully!");
  };

  if (!user) {
    return (
      <div className="container mx-auto p-4 mt-10 text-center">
        <h2 className="text-xl font-semibold mb-4">
          Please log in to view your profile
        </h2>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <h4 className="text-lg font-semibold mb-2">User Information</h4>
          <p>
            <strong>Name:</strong> {user.name || "Guest User"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <hr className="border-gray-300" />

        <div>
          <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
          {editing ? (
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <p>{address}</p>
          )}
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Default Payment Method</h4>
          {editing ? (
            <select
              className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Cash on Delivery</option>
              <option>Credit Card</option>
              <option>PayPal</option>
            </select>
          ) : (
            <p>{paymentMethod}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {editing ? (
            <>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          )}

          <Link
            to="/orders"
            className="px-4 py-2 border border-gray-700 text-gray-700 rounded hover:bg-gray-100"
          >
            My Orders
          </Link>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
