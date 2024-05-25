import React, { useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  useEffect(() => {
    const toggle = document.querySelector('.toggle');
    const nav = document.querySelector('nav');
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }, []);

  return (
    <div className="Header">
      <div className="header">
        <div className="toggle">
          <i className="fas fa-bars"></i>
        </div>
        <nav>
        <li><Link to="/requests">YÊU CẦU ĐANG CHỜ XỬ LÝ</Link></li>
          <ul className="main-menu">
            <li><a id="now" href="trang_chu.html">Dashboard</a></li>
            <li className="submenu">
              <a href="qly_nhan_vien.html">Quản lý nhân viên </a>
              <ul>
                <li>
                  <a href="qly_du_an.html">Quản lý dự án</a>
                </li>
                <li>
                  <a href="quản lý chấm công.html">Quản lý chấm công</a>
                </li>
                <li>
                  <a href="qly_thong_bao.html">Tài liệu - Ấn phẩm</a>
                </li>
                <li>
                  <a href="/src/gioi_thieu_ttpb.html">Thông tin các phòng ban</a>
                </li>
                <li><a href="/src/gioi_thieu_sd.html">Sơ đồ thư viện</a></li>
              </ul>
            </li>
            <li><a href="/src/muon_sach.html">Mượn sách</a></li>
            <li className="submenu">
              <a href="/src/">Liên hệ</a>
            </li>
            <li>
              <a href="/src/"><i className="fas fa-cog"></i></a>
            </li>
            <li>
              <a href="/src/"><i className="fas fa-bell"></i></a>
            </li>
            <li>
              <a href="#" id="userLink"><i className="fas fa-user"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
