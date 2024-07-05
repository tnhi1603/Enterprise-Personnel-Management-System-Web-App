import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Notification.css';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/notification')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        // Sort notifications by NoticeDate in descending order (newest first)
        data.sort((a, b) => new Date(b.NoticeDate) - new Date(a.NoticeDate));
        setNotifications(data);
      })
      .catch(error => {
        console.error('There was an error fetching the notifications data!', error);
      });
  }, []);

  const filteredNotifications = notifications.filter(notification =>
    notification.NoticeTitle && notification.NoticeTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (notificationId) => {
    navigate(`/notification/${notificationId}`);
  };

  return (
    <div className={styles.notificationPage}>
      <div className="notificationContainer">
        <div className="notificationTitle">
          <h2>Danh sách thông báo</h2>
          <Link to="/add_notification" className="addNotificationButton">
            Thêm Thông Báo
          </Link>
        </div>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="notificationSearch"
          />
        </div>
        <table className="notificationTable">
          <thead>
            <tr>
              <th>Tiêu Đề</th>
              <th>Ngày</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification, index) => (
              <tr key={index} onClick={() => handleRowClick(notification.NoticeID)}>
                <td>{notification.NoticeTitle}</td>
                <td>{new Date(notification.NoticeDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notification;
