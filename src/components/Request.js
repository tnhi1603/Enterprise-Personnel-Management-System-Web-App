import React from 'react';
import './Request.css';
import './Footer.css';
import './Header.css';

function Requests() {
  return (
    <div className="requests">
      <nav>
        <ul className="header">
          <li><a href="/">DASHBOARD</a></li>
          <li><a href="/requests" className="active">YÊU CẦU ĐANG CHỜ XỬ LÝ</a></li>
          <li><a href="#">QUẢN LÝ</a></li>
          <li><a href="#">TƯƠNG TÁC</a></li>
          <li><a href="#">LỊCH</a></li>
        </ul>
      </nav>
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
      <div className="footer">
        <h3>HUMAN RESOURCES</h3>
        <p>Địa chỉ: Linh Trung, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</p>
        <p>Fax: Facebook: Email: Hotline:</p>
      </div>
    </div>
  );
}

export default Requests;
