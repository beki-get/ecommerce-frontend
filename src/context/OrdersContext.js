import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";


const BASE_URL = "https://ecommerce-ladv.onrender.com";
const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${BASE_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (err) {
      console.error("Fetch Orders Error:", err.response?.data?.message || err.message);
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

  return (
    <OrdersContext.Provider value={{ orders, fetchOrders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);