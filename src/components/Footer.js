// src/components/Footer.js
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const Footer = () => {
const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async () => {
    try {
      const res = await axios.post("https://ecommerce-ladv.onrender.com/api/newsletter/subscribe", { email });
      setMsg(res.data.message);
      setEmail("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Subscription failed");
    }
  };


  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">MyStore</h2>
          <p className="text-gray-400 text-sm mb-4">
            Your one-stop shop for electronics, fashion, books, and more.  
            Quality products at the best prices.
          </p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-white"><FaGlobe /></a>
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Electronics</a></li>
            <li><a href="#" className="hover:text-white">Fashion</a></li>
            <li><a href="#" className="hover:text-white">Books</a></li>
            <li><a href="#" className="hover:text-white">Home & Kitchen</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white">Shipping Info</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to get special offers, free giveaways, and updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-md text-black w-full focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2 text-xs">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
