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
    phongBan: '',
    gender: '',
    position: '',
    birthplace: '',
    nationality: '',
    nation: '',
    languages: '',
    currentAddress: '',
    dateOfJoining: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: ''
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
      window.alert("Success adding employee");
    } catch (error) {
      console.error('Error adding employee:', error);
      window.alert("Erorr");
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
          <label htmlFor="gender">Giới tính</label>
          <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="position">Chức vụ</label>
          <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="birthplace">Nơi sinh</label>
          <input type="text" id="birthplace" name="birthplace" value={formData.birthplace} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="nationality">Quốc tịch</label>
          <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="nation">Dân tộc</label>
          <input type="text" id="nation" name="nation" value={formData.nation} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="languages">Ngôn ngữ</label>
          <input type="text" id="languages" name="languages" value={formData.languages} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="currentAddress">Địa chỉ hiện tại</label>
          <input type="text" id="currentAddress" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfJoining">Ngày tham gia</label>
          <input type="date" id="dateOfJoining" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default AddEmployee;
