import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Form.css';

const AddProject = () => {
  return (
    <div>
        <div><Header /></div>
    <div className="form-container">
      <h2>Thêm Dự Án</h2>
      <form>
        <div className="form-group">
          <label htmlFor="projectID">MSDA</label>
          <input type="text" id="projectID" name="msda" />
        </div>
        <div className="form-group">
          <label htmlFor="projectName">Tên dự án</label>
          <input type="text" id="projectName" name="tenDuAn" />
        </div>
        <div className="form-group">
          <label htmlFor="department">Phòng ban</label>
          <input type="text" id="department" name="phongBan" />
        </div>
        <div className="form-group">
          <label htmlFor="employee">Các nhân viên</label>
          <input type="text" id="employee" name="cacNhanVien" />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Ngày bắt đầu</label>
          <input type="date" id="startDate" name="ngayBatDau" />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Ngày kết thúc</label>
          <input type="date" id="endDate" name="ngayKetThuc" />
        </div>
        <button type="submit">Lưu</button>
      </form>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default AddProject;
