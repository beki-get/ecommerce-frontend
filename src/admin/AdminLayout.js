// src/admin/AdminLayout.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
