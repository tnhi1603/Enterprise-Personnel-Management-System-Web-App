import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Form.css';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [department, setDepartment] = useState('');
  const [employee, setEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!projectName || !department || !startDate || !employee || !endDate) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      // Chuyển đổi định dạng ngày tháng từ dd/mm/yyyy sang yyyy-mm-dd hh:mm:ss
      const [startDay, startMonth, startYear] = startDate.split('/');
      const formattedStartDate = `${startYear}-${startMonth}-${startDay} 00:00:00`;

      const [endDay, endMonth, endYear] = endDate.split('/');
      const formattedEndDate = `${endYear}-${endMonth}-${endDay} 00:00:00`;

      // Gửi yêu cầu POST để thêm dự án
      const response = await axios.post('http://localhost:3001/api/add_project/add', {
        ProjectName: projectName,
        DepartmentID: parseInt(department),
        StaffID: parseInt(employee),
        StartDate: formattedStartDate,
        EndDate: formattedEndDate
      });

      if (response.status === 200) {
        alert('Dự án đã được thêm thành công');
        // Reset form
        setProjectName('');
        setDepartment('');
        setEmployee('');
        setStartDate('');
        setEndDate('');
        navigate('/project');
      } else {
        alert('Đã có lỗi xảy ra khi thêm dự án');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Đã có lỗi xảy ra khi thêm dự án');
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Thêm Dự Án</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Tên dự án </label>
            <input
              type="text"
              id="projectName"
              name="tenDuAn"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Mã phòng ban </label>
            <input
              type="text"
              id="department"
              name="phongBan"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="employee">Leader </label>
            <input
              type="text"
              id="employee"
              name="cacNhanVien"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Ngày bắt đầu </label>
            <input
              type="text"
              id="startDate"
              name="ngayBatDau"
              placeholder="dd/mm/yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Ngày kết thúc </label>
            <input
              type="text"
              id="endDate"
              name="ngayKetThuc"
              placeholder="dd/mm/yyyy"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type="submit">Lưu</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddProject;
