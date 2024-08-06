// client/src/components/RemoveProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RemoveProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/admin/products/${id}`)
      .then(() => alert('Product removed successfully'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Remove Product</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RemoveProduct;
