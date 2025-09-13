// src/admin/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6">
    <h2 className="text-xl font-bold mb-6">Admin</h2>
    <nav className="flex flex-col gap-3">
      <NavLink to="/admin/dashboard" className="hover:text-blue-300">Dashboard</NavLink>
      <NavLink to="/admin/products" className="hover:text-blue-300">Products</NavLink>
      <NavLink to="/admin/orders" className="hover:text-blue-300">Orders</NavLink>
      <NavLink to="/admin/users" className="hover:text-blue-300">Users</NavLink>
    </nav>
  </aside>
);

export default Sidebar;
