// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold">
             <img src="https://res.cloudinary.com/do2hzkidl/image/upload/v1757509936/Free_nnhvfn.png" alt="Logo" className="h-18 w-20 mr-2 mb-2 mt-2"/>

          </Link>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:bg-blue-500"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {user && (
              <>
                <NavLink to="/profile" className="hover:text-gray-200">
                  Profile
                </NavLink>
                <NavLink to="/wishlist" className="hover:text-gray-200">
                  Wishlist
                </NavLink>
                <NavLink to="/orders" className="hover:text-gray-200">
                  Orders
                </NavLink>
              </>
            )}

            <NavLink to="/cart" className="relative hover:text-gray-200">
              <ShoppingCartIcon className="h-6 w-6 inline" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold rounded-full px-2">
                  {totalItems}
                </span>
              )}
            </NavLink>

            {user ? (
              <>
                <span>Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-2">
          {user && (
            <>
              <NavLink to="/profile" className="block hover:text-gray-200">
                Profile
              </NavLink>
              <NavLink to="/wishlist" className="block hover:text-gray-200">
                Wishlist
              </NavLink>
              <NavLink to="/orders" className="block hover:text-gray-200">
                Orders
              </NavLink>
            </>
          )}

          <NavLink to="/cart" className="block relative hover:text-gray-200">
            Cart ({totalItems})
          </NavLink>

          {user ? (
            <>
              <span className="block">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="w-full text-left bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
