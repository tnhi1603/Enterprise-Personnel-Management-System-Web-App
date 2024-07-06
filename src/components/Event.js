import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Event.css';

function Event() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/event')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        const currentDate = new Date();
        const expirationThreshold = new Date(currentDate);
        expirationThreshold.setDate(currentDate.getDate() - 10);

        // Add isExpired property to each event and sort by EventDate
        const updatedEvents = data.map(event => ({
          ...event,
          isExpired: new Date(event.EventDate) < expirationThreshold
        })).sort((a, b) => new Date(b.EventDate) - new Date(a.EventDate));

        setEvents(updatedEvents);
      })
      .catch(error => {
        console.error('There was an error fetching the events data!', error);
      });
  }, []);

  const filteredEvents = events.filter(event =>
    event.EventName && event.EventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ongoingEvents = filteredEvents.filter(event => !event.isExpired);
  const expiredEvents = filteredEvents.filter(event => event.isExpired);

  const handleRowClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className={styles.eventPage}>
      <div className="eventContainer">
        <div className="eventTitle">
          <h2>Danh sách sự kiện</h2>
          <Link to="/addevent" className="addEventButton">
            Thêm Sự Kiện
          </Link>
        </div>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="eventSearch"
          />
        </div>
        <div className="ongoingEvents">
          <h3>Đang diễn ra</h3>
          <table className="eventTable">
            <thead>
              <tr>
                <th>Tiêu Đề</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {ongoingEvents.map((event, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(event.EventID)}
                >
                  <td>{event.EventName}</td>
                  <td>{new Date(event.EventDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="expiredEvents">
          <h3>Đã hết hạn</h3>
          <table className="eventTable">
            <thead>
              <tr>
                <th>Tiêu Đề</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {expiredEvents.map((event, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(event.EventID)}
                  className="expiredEvent"
                >
                  <td>{event.EventName}</td>
                  <td>{new Date(event.EventDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Event;
