import React, { useState } from 'react';
import './Request.css';
import './Footer.css';
import './Header.css';

const requestsData = [
  { id: 1, title: "Xin nghỉ phép ngày...", status: "Pending", creator: "NguyenA", department: "Kĩ thuật", createDate: "09:00 Sep 08", content: "Xin nghỉ phép ngày.....", deadline: "10:20 Sep 09", state: "Đang chờ duyệt" },
  { id: 2, title: "Xin nghỉ phép ngày...", status: "OK", creator: "NguyenB", department: "IT", createDate: "09:00 Sep 28", content: "Xin nghỉ phép.....", deadline: "10:20 Sep 19", state: "Đang chờ duyệt" },
  // Thêm các yêu cầu khác
];

function Requests() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleRequestClick = (request) => {
    if (selectedRequest && selectedRequest.id === request.id) {
      // Clicking the same request again toggles visibility
      setShowDetails(!showDetails);
    } else {
      // Clicking a different request shows its details
      setSelectedRequest(request);
      setShowDetails(true);
    }
  };

  return (
      <div className="requests">
        <div className="request-content">
          <div className="request-list">
            <h3>Danh sách yêu cầu</h3>
            <ul>
              {requestsData.map((request) => (
                <li key={request.id} onClick={() => handleRequestClick(request)}>
                  {request.title} <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span>
                </li>
              ))}
            </ul>
          </div>
          {selectedRequest && showDetails && (
            <div className="request-detail">
              <h3>{selectedRequest.title}</h3>
              <p>Thời hạn xử lý: {selectedRequest.deadline}</p>
              <p>Trạng thái: {selectedRequest.state}</p>
              <button className="approve">Chấp nhận</button>
              <button className="forward">Chuyển tiếp</button>
              <button className="reject">Hủy</button>
              <div className="request-info">
                <p>Người tạo: {selectedRequest.creator}</p>
                <p>Phòng ban: {selectedRequest.department}</p>
                <p>Ngày tạo: {selectedRequest.createDate}</p>
                <p>Nội dung: {selectedRequest.content}</p>
                <p>Đính kèm:</p>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default Requests;
