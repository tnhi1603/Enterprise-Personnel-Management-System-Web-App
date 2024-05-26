import React, { useEffect } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.png'; 

function Header() {
  const location = useLocation();

  useEffect(() => {
    const toggle = document.querySelector('.toggle');
    const nav = document.querySelector('nav');
    const handleToggle = () => {
      nav.classList.toggle('active');
    };
    
    toggle.addEventListener('click', handleToggle);
    
    return () => {
      toggle.removeEventListener('click', handleToggle);
    };
  }, []);

  const getActiveClass = (path) => {
    return location.pathname === path ? 'now' : '';
  };

  return (
      <div className="Head">
        <div className="image-container">
          <img src={logo} alt="Logo" /> {}
        </div>
      <div className="header">
        <div className="toggle">
          <i className="fas fa-bars"></i>
        </div>
        <nav>
          <ul className="main-menu">
            <li className={getActiveClass('/dashboard')}><Link to="/dashboard">DASHBOARD</Link></li>
            <li className={`submenu ${getActiveClass('/project')}`}>
              <Link to="/project">QUẢN LÝ</Link>
              <ul>
                <li><Link to="/project">Quản lý dự án</Link></li>
                <li><Link to="/">Quản lý chấm công</Link></li>
                <li><Link to="/">Quản lý nhân viên</Link></li>
              </ul>
            </li>
            <li className={getActiveClass('/requests')}><Link to="/requests">YÊU CẦU ĐANG CHỜ XỬ LÝ</Link></li>
            <li className={getActiveClass('/interactions')}><Link to="/interactions">TƯƠNG TÁC</Link></li>
            <li className={getActiveClass('/calendar')}><Link to="/calendar">LỊCH</Link></li>
            <li><Link to="/"><i className="fas fa-cog"></i></Link></li>
            <li><Link to="/"><i className="fas fa-bell"></i></Link></li>
            <li className={getActiveClass('/login')}><Link to="/login"><i className="fas fa-user"></i></Link></li>
          </ul>
        </nav>
      </div>
      </div>
  );
}

export default Header;
