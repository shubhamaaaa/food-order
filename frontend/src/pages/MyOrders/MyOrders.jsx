import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]); // Ensure data is initialized as an empty array

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData(response.data.data || []); // Fallback to an empty array if data is undefined
        } catch (error) {
            console.error("Error fetching orders:", error);
            setData([]); // Set data to an empty array on error
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            {Array.isArray(data) && data.length > 0 ? (
                data.map((order, index) => (
                    <div key={index} className="order-item">
                        <p>Order ID: {order._id}</p>
                        <p>Order Date: {order.date}</p>
                        <p>Total: ${order.total}</p>
                        {/* Add more fields as necessary */}
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default MyOrders;

           