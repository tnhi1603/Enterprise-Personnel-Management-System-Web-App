import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Form.css';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    EventName: '',
    EventDate: '',
    EventContent: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/event/${id}`)
      .then(response => {
        setEvent(response.data);
        setEditedEvent({
          EventName: response.data.EventName,
          EventDate: new Date(response.data.EventDate).toISOString().substring(0, 10),
          EventContent: response.data.EventContent
        });
      })
      .catch(error => {
        console.error('There was an error fetching the notification data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSave = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    const formattedDate = currentDate.toISOString().substring(0, 10);

    // Update editedNotification with new date
    const updatedEvent = { ...editedEvent, EventDate: formattedDate };

    axios.put(`http://localhost:3001/api/event/add/${id}`, updatedEvent)
      .then(response => {
        setEvent(response.data);
        setIsEditing(false);
        window.alert('Event updated successfully!');
        navigate('/event'); // Navigate to /notifications after successful save
      })
      .catch(error => {
        console.error('There was an error updating the event data!', error);
        window.alert('There was an error updating the event.');
      });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notificationDetailPage">
      <div className="notificationDetailContainer">
        {isEditing ? (
          <div>
            <h3>Sửa sự kiện</h3>
            <input
              type="text"
              name="NoticeTitle"
              value={editedEvent.EventName}
              onChange={handleChange}
            />
            <br></br>
            <textarea
              name="EventContent"
              value={editedEvent.EventContent}
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <h2>{event.EventName}</h2>
            <p><strong>Date:</strong> {new Date(event.EventDate).toLocaleDateString()}</p>
            <p>{event.EventContent}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
        <Link to="/event" className="backButton">Back to Events</Link>
      </div>
    </div>
  );
}

export default EventDetail;
