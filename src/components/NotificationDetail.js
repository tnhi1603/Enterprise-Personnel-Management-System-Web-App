import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';

function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotification, setEditedNotification] = useState({
    NoticeTitle: '',
    NoticeDate: '',
    NoticeContent: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/notification/${id}`)
      .then(response => {
        setNotification(response.data);
        setEditedNotification({
          NoticeTitle: response.data.NoticeTitle,
          NoticeDate: new Date(response.data.NoticeDate).toISOString().substring(0, 10),
          NoticeContent: response.data.NoticeContent
        });
      })
      .catch(error => {
        console.error('There was an error fetching the notification data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNotification({ ...editedNotification, [name]: value });
  };

  const handleSave = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    const formattedDate = currentDate.toISOString().substring(0, 10);

    // Update editedNotification with new date
    const updatedNotification = { ...editedNotification, NoticeDate: formattedDate };

    axios.put(`http://localhost:3001/api/notification/add/${id}`, updatedNotification)
      .then(response => {
        setNotification(response.data);
        setIsEditing(false);
        window.alert('Notification updated successfully!');
        navigate('/notification'); // Navigate to /notifications after successful save
      })
      .catch(error => {
        console.error('There was an error updating the notification data!', error);
        window.alert('There was an error updating the notification.');
      });
  };

  if (!notification) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notificationDetailPage">
      <div className="notificationDetailContainer">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="NoticeTitle"
              value={editedNotification.NoticeTitle}
              onChange={handleChange}
            />
            <textarea
              name="NoticeContent"
              value={editedNotification.NoticeContent}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <h2>{notification.NoticeTitle}</h2>
            <p><strong>Date:</strong> {new Date(notification.NoticeDate).toLocaleDateString()}</p>
            <p>{notification.NoticeContent}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
        <Link to="/notification" className="backButton">Back to Notifications</Link>
      </div>
    </div>
  );
}

export default NotificationDetail;
