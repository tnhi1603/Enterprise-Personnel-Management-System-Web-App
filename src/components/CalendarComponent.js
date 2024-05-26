import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Header from './Header.js';
import Footer from './Footer.js';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; 

const CalendarComponent = ({ tasks, onSelectDate }) => {
  const [date, setDate] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleDateChange = (date) => {
    setDate(date);
    onSelectDate(date);
    setSelectedTasks(tasks[date.toDateString()] || []);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && tasks && tasks[date.toDateString()]) {
      return <div className="dot"></div>;
    }
    return null;
  };

  return (
    <div className="page">
      <div><Header /></div>
    <div className="calendar-page">
      <div className="calendar-column">
        <div className="calendar-title">Calendar</div>
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileContent={tileContent}
          />
        </div>
      </div>
      <div className="task-column">
        <div className="task-title">Tasks</div>
        <ul>
          {selectedTasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
    <div><Footer /></div>
    </div>
  );
};

export default CalendarComponent;
