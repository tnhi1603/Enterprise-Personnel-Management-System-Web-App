import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function AddNoti() {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('noticeTitle', noticeTitle);
    formData.append('noticeContent', noticeContent);
    formData.append('attachment', attachment);

    try {
      const response = await axios.post('http://localhost:3001/api/addnoti', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Notification added successfully');
        setNoticeTitle('');
        setNoticeContent('');
        setAttachment(null);
        navigate(`/notification`);
      }
    } catch (err) {
      setError('Error adding notification');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Notification</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={noticeContent}
            onChange={(e) => setNoticeContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Attachment:</label>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
        <button type="submit">Add Notification</button>
      </form>
    </div>
  );
}

export default AddNoti;
