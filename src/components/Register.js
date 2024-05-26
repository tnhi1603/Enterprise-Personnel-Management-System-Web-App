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
        <div className="form-group">
        <label>Username: </label>
        <input type="text" name="username" />
        </div>
        <div className="form-group">
        <label>Email: </label>
        <input type="email" name="email" />
        </div>
        <div className="form-group">
        <label>Password: </label>
        <input type="password" name="password" />
        </div>
        <div className="form-group">
        <label>Retype Password: </label>
        <input type="password" name="retype-password" />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
      <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default Register;
