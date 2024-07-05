import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
// import styles from './NotificationDetail.css';

function NotificationDetail() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/notification/${id}`)
      .then(response => {
        setNotification(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the notification data!', error);
      });
  }, [id]);

  if (!notification) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notificationDetailPage">
      <div className="notificationDetailContainer">
        <h2>{notification.NoticeTitle}</h2>
        <p><strong>Date:</strong> {new Date(notification.NoticeDate).toLocaleDateString()}</p>
        <p>{notification.NoticeContent}</p>
        <Link to="/notifications" className="backButton">Back to Notifications</Link>
      </div>
    </div>
  );
}

export default NotificationDetail;
