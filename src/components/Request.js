import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Request.css';

function Requests() {
  const { requestID } = useParams();
  const [requestsData, setRequestsData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/requests');
        // Sort requests to have 'Pending' ones at the top
        const sortedRequests = response.data.sort((a, b) => {
          if (a.RequestState === 'Pending' && b.RequestState !== 'Pending') return -1;
          if (a.RequestState !== 'Pending' && b.RequestState === 'Pending') return 1;
          return 0;
        });
        setRequestsData(sortedRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (requestID) {
      axios.get(`http://localhost:3001/api/requests/${requestID}`)
        .then(response => {
          setSelectedRequest(response.data);
        })
        .catch(error => console.error('Error fetching request details:', error));
    }
  }, [requestID]);

  const updateRequestStatus = async (requestID, status) => {
    try {
      await axios.put(`http://localhost:3001/api/requests/${requestID}`, { status });
      setRequestsData(requestsData.map(req => req.RequestID === requestID ? { ...req, RequestState: status } : req));
      if (selectedRequest && selectedRequest.RequestID === requestID) {
        setSelectedRequest({ ...selectedRequest, RequestState: status });
      }
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
              <li key={request.RequestID}>
                <Link to={`/requests/${request.RequestID}`} className="request-link">
                  {request.RequestTitle} <span className={`status ${request.RequestState.toLowerCase()}`}>{request.RequestState}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {selectedRequest && (
          <div className="request-detail">
            <h3>{selectedRequest.RequestTitle}</h3>
            <p>Thời hạn xử lý: {selectedRequest.Time}</p>
            <p>Trạng thái: {selectedRequest.RequestState}</p>
            {selectedRequest.RequestState === 'Pending' && (
              <div>
                <button className="approve" onClick={() => updateRequestStatus(selectedRequest.RequestID, 'Accepted')}>Chấp nhận</button>
                <button className="forward" onClick={() => updateRequestStatus(selectedRequest.RequestID, 'Forwarded')}>Chuyển tiếp</button>
                <button className="reject" onClick={() => updateRequestStatus(selectedRequest.RequestID, 'Cancelled')}>Hủy</button>
              </div>
            )}
            {selectedRequest.RequestState === 'Accepted' && <p>Đã chấp nhận</p>}
            {selectedRequest.RequestState === 'Forwarded' && <p>Đã chuyển tiếp</p>}
            {selectedRequest.RequestState === 'Cancelled' && <p>Đã hủy</p>}
            <div className="request-info">
              <p>Người tạo: {selectedRequest.StaffID}</p>
              <p>Phòng ban: {selectedRequest.DepartmentID}</p>
              <p>Ngày tạo: {selectedRequest.Time}</p>
              <p>Nội dung: {selectedRequest.Content}</p>
              <p>Đính kèm: {selectedRequest.Attachment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;
