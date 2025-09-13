// AdminOrders.js
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/admin/orders');
        setOrders(res.data.orders); // ✅ fixed: use res.data.orders
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete order?')) return;
    await api.delete(`/admin/orders/${id}`);
    setOrders(orders.filter(o => o._id !== id));
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.put(`/admin/orders/${id}/status`, { status });
      setOrders(orders.map(o => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaymentChange = async (id, paymentStatus) => {
    try {
      const res = await api.put(`/admin/orders/${id}/payment-status`, { paymentStatus });
      setOrders(orders.map(o => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {orders.map(o => (
          <div key={o._id} className="bg-white p-4 rounded shadow">
          

            <div className="font-semibold">Order ID: {o._id}</div>
            <div>Total: ${o.totalAmount}</div>

{/* Show product images + names */}
            <div className="mt-2">
              <h3 className="font-medium mb-1">Product:</h3>
              {o.products.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  {p.productId?.image && (
                    <img
                      src={p.productId.image}
                      alt={p.productId.name}
                      className="h-25 w-25 object-cover rounded mb-2"
                    />
                  )}
                  <div>
                    <div>{p.productId?.name}</div>
                    <div>Qty: {p.quantity}</div>
                  </div>
                </div>
              ))}
            </div>


            {/* ✅ Order Status Dropdown */}
            <div className="mt-2">
              <label>Status: </label>
              <select
                value={o.status}
                onChange={(e) => handleStatusChange(o._id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* ✅ Payment Status Dropdown */}
            <div className="mt-2">
              <label>Payment: </label>
              <select
                value={o.paymentStatus}
                onChange={(e) => handlePaymentChange(o._id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleDelete(o._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
