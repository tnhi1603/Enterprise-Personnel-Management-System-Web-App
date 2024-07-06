import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Form.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    msnv: '',
    hoTen: '',
    ngaySinh: '',
    cccd: '',
    phongBan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/add_employee/add', formData);
      console.log(response.data); 
      
    } catch (error) {
      console.error('Error adding employee:', error);
      // Handle error: show error message or retry logic
    }
  };

  return (
      <div className="form-container">
        <h2>Thêm Nhân Viên</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="msnv">MSNV</label>
            <input type="text" id="msnv" name="msnv" value={formData.msnv} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="staffName">Họ và tên</label>
            <input type="text" id="staffName" name="hoTen" value={formData.hoTen} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="dayOfBirth">Ngày tháng năm sinh</label>
            <input type="date" id="dayOfBirth" name="ngaySinh" value={formData.ngaySinh} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="cccd">Số CCCD/CMND</label>
            <input type="text" id="cccd" name="cccd" value={formData.cccd} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="department">Phòng ban</label>
            <input type="text" id="department" name="phongBan" value={formData.phongBan} onChange={handleChange} />
          </div>
          <button type="submit">Lưu</button>
        </form>
      </div>
  );
}

export default AddEmployee;
