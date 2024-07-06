import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Request.css';

function Requests() {
  const [requestsData, setRequestsData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/requests');
        setRequestsData(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestClick = (request) => {
    if (selectedRequest && selectedRequest.id === request.id) {
      setShowDetails(!showDetails);
    } else {
      setSelectedRequest(request);
      setShowDetails(true);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3001/api/requests/${id}`, { status });
      setRequestsData(requestsData.map(req => req.id === id ? { ...req, RequestState: status } : req));
      setSelectedRequest({ ...selectedRequest, RequestState: status });
    } catch (error) {
      console.error('Error updating request status:', error);
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
                {request.title} <span className={`status ${request.RequestState.toLowerCase()}`}>{request.RequestState}</span>
              </li>
            ))}
          </ul>
        </div>
        {selectedRequest && showDetails && (
          <div className="request-detail">
            <h3>{selectedRequest.title}</h3>
            <p>Thời hạn xử lý: {selectedRequest.deadline}</p>
            <p>Trạng thái: {selectedRequest.RequestState}</p>
            {selectedRequest.RequestState === 'Pending' && (
              <div>
                <button className="approve" onClick={() => updateRequestStatus(selectedRequest.id, 'Accepted')}>Chấp nhận</button>
                <button className="forward" onClick={() => updateRequestStatus(selectedRequest.id, 'Forwarded')}>Chuyển tiếp</button>
                <button className="reject" onClick={() => updateRequestStatus(selectedRequest.id, 'Cancelled')}>Hủy</button>
              </div>
            )}
            {selectedRequest.RequestState === 'Accepted' && <p>Đã chấp nhận</p>}
            {selectedRequest.RequestState === 'Forwarded' && <p>Đã chuyển tiếp</p>}
            {selectedRequest.RequestState === 'Cancelled' && <p>Đã hủy</p>}
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
