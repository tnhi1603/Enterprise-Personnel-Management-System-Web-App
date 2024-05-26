import React from 'react';
import './Request.css';
import './Footer.css';
import './Header.css';
import Header from './Header.js';
import Footer from './Footer.js';

function Requests() {
  return (
    <div className="page">
    <div><Header /></div>
    <div className="requests">
      <div className="request-content">
        <div className="request-list">
          <h3>Danh sách yêu cầu</h3>
          <ul>
            <li>Xin nghỉ phép ngày... <span className="status pending">Pending</span></li>
            {/* Thêm các yêu cầu khác */}
          </ul>
        </div>
        <div className="request-detail">
          <h3>Xin nghỉ phép</h3>
          <p>Thời hạn xử lý: 10:20 Sep 09</p>
          <p>Trạng thái: Đang chờ duyệt</p>
          <button className="approve">Chấp nhận</button>
          <button className="forward">Chuyển tiếp</button>
          <button className="reject">Hủy</button>
          <div className="request-info">
            <p>Người tạo: NguyenA</p>
            <p>Phòng ban: Kĩ thuật</p>
            <p>Ngày tạo: 09:00 Sep 08</p>
            <p>Nội dung: Xin nghỉ phép ngày.....</p>
            <p>Đính kèm:</p>
          </div>
        </div>
      </div>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default Requests;
