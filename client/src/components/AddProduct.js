// client/src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    size: [], // Array of sizes
    quantityBySize: {}, // Map of size to quantity
    price: 0,
    hasDiscount: false,
    discountPercentage: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSizeChange = (e) => {
    const sizes = e.target.value.split(',').map(size => size.trim());
    setProduct((prevProduct) => ({
      ...prevProduct,
      size: sizes
    }));
  };

  const handleQuantityChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantityBySize: {
        ...prevProduct.quantityBySize,
        [name]: Number(value)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/admin/products', product)
      .then(response => alert('Product added successfully'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="size" onChange={handleSizeChange} placeholder="Sizes (comma separated)" />
      {product.size.map((size, index) => (
        <div key={index}>
          <input
            type="number"
            name={size}
            value={product.quantityBySize[size] || ''}
            onChange={handleQuantityChange}
            placeholder={`Quantity for ${size}`}
          />
        </div>
      ))}
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" />
      <label>
        <input type="checkbox" name="hasDiscount" checked={product.hasDiscount} onChange={handleChange} />
        Has Discount
      </label>
      {product.hasDiscount && (
        <input type="number" name="discountPercentage" value={product.discountPercentage} onChange={handleChange} placeholder="Discount Percentage" />
      )}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
