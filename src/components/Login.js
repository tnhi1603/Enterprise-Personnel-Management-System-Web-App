import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import Header from './Header.js';
import Footer from './Footer.js';


function Login() {
  return (
    <div className="login">
    <div><Header /></div>
    <div className="form-container">
      <h2>ĐĂNG NHẬP</h2>
      <form>
        <div className="form-group">
        <label>Email: </label>
        <input type="text" name="email" />
        </div>
        <div className="form-group">
        <label>Password: </label>
        <input type="password" name="password" />
        </div>
        <button type="submit">ĐĂNG NHẬP</button>
      </form>
      <Link to="/register">Đăng ký</Link>
      <Link to="/forgot-password">Quên mật khẩu?</Link>
    </div>
    <div className><Footer /></div>
    </div>
  );
}

export default Login;
