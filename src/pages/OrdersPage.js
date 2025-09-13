// mini-ecommerce-frontend/src/pages/OrdersPage.js
"use client";
import React, { useEffect } from "react";
import { useOrders } from "../context/OrdersContext";

const OrdersPage = () => {
  const { orders, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            
            <div key={order._id} className="border rounded-lg p-4 shadow-sm bg-white">
              {/* Order Header */}
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order ID:</span>
                <span className="text-gray-600">{order._id.slice(-6)}</span>
              </div>

              <div className="flex justify-between mb-2 items-center">
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800" // pending
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total:</span>
                <span className="text-gray-700">${order.totalAmount}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Date:</span>
                <span className="text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Items */}
              <div>
                <span className="font-semibold">Items:</span>
                <ul className="list-disc list-inside mt-1 space-y-1">
                
                 {order.products.map((item, index) => (
  <li
    key={item.productId ? `${item.productId._id}-${index}` : `item-${index}`}
    className="text-gray-700"
  >
    {item.productId ? item.productId.name : "Product Not Available"} x {item.quantity} (${item.price} each)
  </li>
))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
