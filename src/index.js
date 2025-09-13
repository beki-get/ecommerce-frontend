

// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import {WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter
import { OrdersProvider } from "./context/OrdersContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        
        <OrdersProvider>
        <WishlistProvider>  
            <ThemeProvider>
            <App />
            </ThemeProvider>
          </WishlistProvider>
        </OrdersProvider>
        
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
 
  </React.StrictMode>
);
