import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import AddProduct from './components/AddProduct';
import RemoveProduct from './components/RemoveProduct';
import ViewOrders from './components/ViewOrders';
import Login from './components/Login';
import Register from './components/Register'; // Import the Register component

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add the Register route */}
        <Route
          path="/admin/add-product"
          element={token ? <AddProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/remove-product"
          element={token ? <RemoveProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/view-orders"
          element={token ? <ViewOrders /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
