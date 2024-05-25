import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import Header from './Header.js';
import Footer from './Footer.js';

function Register() {
  return (
    <div className="register">
    <div><Header /></div>
    <div className="form-container">
      <h2>ĐĂNG KÝ</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <label>
          Retype Password:
          <input type="password" name="retype-password" />
        </label>
        <button type="submit">Đăng ký</button>
      </form>
      <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default Register;
