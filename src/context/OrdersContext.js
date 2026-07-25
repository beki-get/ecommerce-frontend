import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BASE_URL = "https://ecommerce-ladv.onrender.com";
const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch orders from backend
  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch orders";
      setError(errorMessage);
      console.error("Fetch Orders Error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [token]);

  // Add new order to state (after checkout)
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    setError(null);
    try {
      await axios.put(
        `${BASE_URL}/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to cancel order";
      setError(errorMessage);
      console.error("Cancel Order Error:", errorMessage);
      throw err;
    }
  };

  // Update order status or payment status
  const updateOrder = async (orderId, updates) => {
    setError(null);
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/orders/${orderId}`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, ...data } : order
        )
      );
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update order";
      setError(errorMessage);
      console.error("Update Order Error:", errorMessage);
      throw err;
    }
  };

  return (
    <OrdersContext.Provider 
      value={{ 
        orders, 
        fetchOrders, 
        addOrder, 
        cancelOrder, 
        updateOrder,
        error,
        loading 
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
