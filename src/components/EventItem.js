import React from 'react';
import './EventItem.css';

function EventItem({ name, date }) {
  return (
    <div className="event-item">
      <span className="event-name">{name}</span>
      <span className="event-date">{date}</span>
    </div>
  );
}

export default EventItem;
