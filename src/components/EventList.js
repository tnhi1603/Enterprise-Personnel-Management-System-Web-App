import React from 'react';
import './EventList.css';

function EventList({ events }) {
  return (
    <ul className="event-list">
      {events.map(event => (
        <li key={event.id} className="event-item">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
