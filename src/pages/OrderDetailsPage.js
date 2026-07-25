import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { orders, fetchOrders, cancelOrder, updateOrder, error } = useOrders();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return (
      <div className="container mx-auto p-4 mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
        <Link
          to="/orders"
          className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setIsLoading(true);
      setLocalError("");
      try {
        await cancelOrder(order._id);
        alert("Order canceled successfully!");
        navigate("/orders");
      } catch (err) {
        setLocalError(err.response?.data?.message || "Failed to cancel order");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMarkAsPaid = async () => {
    setIsLoading(true);
    setLocalError("");
    try {
      await updateOrder(order._id, { paymentStatus: "Paid" });
      alert("Order marked as Paid!");
      await fetchOrders();
    } catch (err) {
      setLocalError(err.response?.data?.message || "Failed to update payment status");
    } finally {
      setIsLoading(false);
    }
  };

  const statusBadge = (status) => {
    const base = "px-2 py-1 rounded text-xs font-semibold";
    switch (status) {
      case "pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "completed":
      case "delivered":
        return `${base} bg-green-100 text-green-800`;
      case "cancelled":
        return `${base} bg-red-100 text-red-800`;
      case "shipped":
        return `${base} bg-blue-100 text-blue-800`;
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

      {(error || localError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error || localError}
        </div>
      )}

      <div className="mb-3 flex justify-between">
        <span className="font-semibold">Order ID:</span>
        <span className="text-gray-700">{order._id}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span className="font-semibold">Status:</span>
        <span className={statusBadge(order.status)}>
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="mb-3 flex justify-between">
        <span className="font-semibold">Payment Status:</span>
        <span className={paymentBadge(order.paymentStatus || "Unpaid")}>
          {order.paymentStatus || "Unpaid"}
        </span>
      </div>

      <div className="mb-3">
        <span className="font-semibold">Shipping Address:</span>
        <div className="text-gray-700 mt-1">
          {order.address && typeof order.address === "object"
            ? `${order.address.street}, ${order.address.city}, ${order.address.zip}`
            : order.address || "N/A"}
        </div>
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
              {order.products && order.products.length > 0 ? (
                order.products.map((p, idx) => {
                  const productName =
                    p.productId && typeof p.productId === "object"
                      ? p.productId.name
                      : p.name || "Product Not Available";
                  const productPrice = p.price || 0;

                  return (
                    <tr key={p.productId?._id || idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{productName}</td>
                      <td className="px-4 py-2 border-b">{p.quantity}</td>
                      <td className="px-4 py-2 border-b">${productPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b">
                        ${(productPrice * p.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 border-b text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6 flex justify-between font-semibold text-lg">
        <span>Total Amount:</span>
        <span>${(order.totalAmount || 0).toFixed(2)}</span>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {order.status === "pending" && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Cancel Order"}
          </button>
        )}

        {(order.paymentMethod === "COD" || order.paymentMethod === "cod") &&
          order.paymentStatus !== "Paid" && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
              onClick={handleMarkAsPaid}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Mark as Paid"}
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
