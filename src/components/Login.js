import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import Header from './Header';
import Footer from './Footer';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = axios.post('http://localhost:3001/api/login', { username, password });
      // Assuming the token is returned in the response
      const { token } = response.data;

      // Save token to local storage or state management
      localStorage.setItem('token', token);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login">
      <div><Header /></div>
      <div className="form-container">
        <h2>ĐĂNG NHẬP</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">ĐĂNG NHẬP</button>
        </form>
        <Link to="/register">Đăng ký</Link>
        <Link to="/forgot-password">Quên mật khẩu?</Link>
      </div>
      <div><Footer /></div>
    </div>
  );
}

export default Login;
