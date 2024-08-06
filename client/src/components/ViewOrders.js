// client/src/components/ViewOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Customer: {order.customer.name}</p>
            <p>Address: {order.customer.address}</p>
            <p>Total: ${order.totalAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrders;
