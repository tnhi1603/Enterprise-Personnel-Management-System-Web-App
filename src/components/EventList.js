import React from 'react';

function EventList({ events }) {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <span>{event.name}</span>
          <span>{event.date}</span>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
