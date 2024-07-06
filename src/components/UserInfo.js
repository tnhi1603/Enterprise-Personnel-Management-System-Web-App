import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {jwtEncode} from 'jwt-encode';
import './Form.css';

const secret = 'a3d9f85a7e9b1c23984f8e237a6df8b7e39a6d87e4a5c6d78b39a6e57c3d7a4b';

function UserInfo() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const adminID = decodedToken.AdminID;

        // Fetch user information from the server
        fetch(`http://localhost:3001/api/login/${adminID}`)
          .then(response => response.json())
          .then(data => {
            setUsername(data.Username);
            setEmail(data.Email);
          })
          .catch(err => {
            console.error('Error fetching user data', err);
            setError('Error fetching user data');
          });
      } catch (err) {
        console.error('Invalid token');
        localStorage.removeItem('token'); 
      }
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const adminID = decodedToken.AdminID;

      // Send updated user information to the server
      fetch(`http://localhost:3001/api/login/${adminID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update the token with the new user information
        const newToken = jwtEncode(
          { ...decodedToken, Username: username, Email: email },
          secret
        );
        localStorage.setItem('token', newToken);
        setSuccess('User information updated successfully');
      })
      .catch(err => {
      });
    } catch (err) {
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>User Information</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserInfo;
