// frontend/src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import OrdersPage from "./pages/OrdersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import Footer from "./components/Footer";
//admin imports

import AdminLayout from './admin/AdminLayout';
import ProtectedAdminRoute from './admin/ProtectedAdminRoute';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminProducts from './admin/pages/AdminProducts';
import AdminOrders from './admin/pages/AdminOrders';
import AdminUsers from './admin/pages/AdminUsers';




function App() {
  return (
    <>
      {/* Show Navbar ONLY for customer routes */}
      <Routes>


        
        {/* Admin routes */}
        <Route path="/admin/*" element={
  <ProtectedAdminRoute>
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Routes>
    </AdminLayout>
  </ProtectedAdminRoute>
} />
        
          
        
        
        {/* Customer-facing routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
               
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailsPage />} />
               
                {/* Protected user routes */}
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetailsPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </>
          }
        />

        
      </Routes>
    </>
  );
}

export default App;
