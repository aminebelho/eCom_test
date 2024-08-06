// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        alert('Logged in successfully');
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>hello world</div>
      <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
