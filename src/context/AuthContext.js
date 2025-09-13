// mini-ecommerce-frontend/src/context/AuthContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Store user and token separately
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  // Expect login(data) where data = { user, token }
  const login = (data) => {
    if (!data || !data.user || !data.token) {
      console.error("Invalid login response:", data);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const authFetch = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authFetch, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);