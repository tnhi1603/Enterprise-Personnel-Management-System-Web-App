import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
      } catch (err) {
        console.error('Invalid token');
        localStorage.removeItem('token'); 
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      const { token } = response.data;

      // Save token to local storage
      localStorage.setItem('token', token);

      // Redirect to the dashboard
      navigate('/userinfo');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="form-container">
      <>
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
      </>
    </div>
  );
}

export default Login;
