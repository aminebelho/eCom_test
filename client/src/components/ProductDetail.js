import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    // Handle adding product to cart
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Size: ${product.size}</p>
      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        min="1"
        max={product.quantity}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
