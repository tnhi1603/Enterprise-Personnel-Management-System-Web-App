import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Form.css';

const AddEmployee = () => {
  return (
    <div>
      <div><Header /></div>
      <div className="form-container">
      <h2>Thêm Nhân Viên</h2>
      <form>
        <div className="form-group">
          <label htmlFor="msnv">MSNV</label>
          <input type="text" id="msnv" name="msnv" />
        </div>
        <div className="form-group">
          <label htmlFor="staffName">Họ và tên</label>
          <input type="text" id="staffName" name="hoTen" />
        </div>
        <div className="form-group">
          <label htmlFor="dayOfBirth">Ngày tháng năm sinh</label>
          <input type="date" id="dayOfBirth" name="ngaySinh" />
        </div>
        <div className="form-group">
          <label htmlFor="cccd">Số CCCD/CMND</label>
          <input type="text" id="cccd" name="cccd" />
        </div>
        <div className="form-group">
          <label htmlFor="department">Phòng ban</label>
          <input type="text" id="department" name="phongBan" />
        </div>
        <button type="submit">Lưu</button>
      </form>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default AddEmployee;
