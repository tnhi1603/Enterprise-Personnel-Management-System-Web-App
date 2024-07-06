import React from 'react';
import './EventList.css';

const EventList = ({ events = [] }) => {
  return (
    <table className="event-table">
      <thead>
        <tr>
          <th>Tên Sự Kiện</th>
          <th>Ngày Sự Kiện</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.EventID} className="event-item">
            <td><a href={`/events/${event.EventID}`}>{event.EventName}</a></td>
            <td>{new Date(event.EventDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventList;
