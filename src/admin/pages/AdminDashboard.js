// src/admin/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Products</div>
          <div className="text-2xl">{stats.productsCount || 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Orders</div>
          <div className="text-2xl">{stats.ordersCount || 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-2xl">{stats.usersCount || 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl">${stats.revenue || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
