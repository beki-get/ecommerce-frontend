// src/pages/OrderDetailsPage.js
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { orders, cancelOrder, updateOrder } = useOrders();
  const navigate = useNavigate();

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return (
      <div className="container mx-auto p-4 mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <Link
          to="/orders"
          className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(order._id);
      alert("Order canceled successfully!");
      navigate("/orders");
    }
  };

  const handleMarkAsPaid = () => {
    updateOrder(order._id, { paymentStatus: "Paid" });
    alert("Order marked as Paid!");
  };

  const statusBadge = (status) => {
    const base = "px-2 py-1 rounded text-xs font-semibold";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "completed":
        return `${base} bg-green-100 text-green-800`;
      case "cancelled":
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-gray-100 text-gray-800`;
    }
  };

  const paymentBadge = (paymentStatus) =>
    `px-2 py-1 rounded text-xs font-semibold ${
      paymentStatus === "Paid"
        ? "bg-green-100 text-green-800"
        : "bg-yellow-100 text-yellow-800"
    }`;

  return (
    <div className="container mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>

      <div className="mb-3 flex justify-between">
        <span className="font-semibold">Order ID:</span>
        <span className="text-gray-700">{order._id}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span className="font-semibold">Status:</span>
        <span className={statusBadge(order.status)}>{order.status}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span className="font-semibold">Payment Status:</span>
        <span className={paymentBadge(order.paymentStatus)}>
          {order.paymentStatus}
        </span>
      </div>

      <div className="mb-3">
        <span className="font-semibold">Shipping Address:</span>
        <div className="text-gray-700 mt-1">{order.address || "N/A"}</div>
      </div>

      <div className="mb-6">
        <span className="font-semibold">Products:</span>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((p, idx) => (
                <tr key={p.productId._id || idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{p.name}</td>
                  <td className="px-4 py-2 border-b">{p.quantity}</td>
                  <td className="px-4 py-2 border-b">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-2 border-b">
                    ${(p.price * p.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6 flex justify-between font-semibold text-lg">
        <span>Total Amount:</span>
        <span>${order.totalAmount.toFixed(2)}</span>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {order.status === "pending" && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel Order
          </button>
        )}

        {order.paymentMethod === "COD" && order.paymentStatus === "Unpaid" && (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleMarkAsPaid}
          >
            Mark as Paid
          </button>
        )}

        <Link
          to="/orders"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
