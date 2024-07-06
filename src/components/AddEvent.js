import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function AddEvent() {
  const [eventName, setEventName] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      eventName,
      eventContent
    };

    try {
      const response = await axios.post('http://localhost:3001/api/addevent', eventData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess('Event added successfully');
        setEventName('');
        setEventContent('');
        setTimeout(() => navigate(`/event`), 2000);
      }
    } catch (err) {
      setError('Error adding event: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Event</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={eventContent}
            onChange={(e) => setEventContent(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
