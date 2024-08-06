import React, { useState } from 'react';
import axios from 'axios';

function CartPage() {
  const [order, setOrder] = useState({
    customer: { name: '', email: '', phone: '', address: '' },
    products: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/orders', order)
      .then(response => {
        alert('Order placed successfully');
        // Redirect or clear cart
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Cart</h1>
      {/* Display cart items */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={order.customer.name}
          onChange={e => setOrder({ ...order, customer: { ...order.customer, name: e.target.value } })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={order.customer.email}
          onChange={e => setOrder({ ...order, customer: { ...order.customer, email: e.target.value } })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={order.customer.phone}
          onChange={e => setOrder({ ...order, customer: { ...order.customer, phone: e.target.value } })}
        />
        <textarea
          placeholder="Address"
          value={order.customer.address}
          onChange={e => setOrder({ ...order, customer: { ...order.customer, address: e.target.value } })}
          required
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CartPage;
