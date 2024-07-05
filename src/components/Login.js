import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Form.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setLoggedInUser(decodedToken.username);
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      const { token } = response.data;

      // Save token to local storage or state management
      localStorage.setItem('token', token);

      // Decode the token to get the username
      const decodedToken = jwtDecode(token);
      setLoggedInUser(decodedToken.username);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  if (loggedInUser) {
    return (
      <div className="form-container">
        <div>
          <h2>Welcome, {loggedInUser}!</h2>
          <Link to="/dashboard">Go to Dashboard</Link>
        </div>
      </div>
    );
  } else{

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
}

export default Login;
