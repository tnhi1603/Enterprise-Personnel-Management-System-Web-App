import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; 

const CalendarComponent = ({ onSelectDate }) => {
  const [date, setDate] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    fetchProjects();
    fetchEvents();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/calendar/projects');
      const projects = await response.json();

      let tasksData = {};
      for (let project of projects) {
        tasksData = {
          ...tasksData,
          [new Date(project.startDate).toDateString()]: [`Project Start: ${project.name}`],
          [new Date(project.endDate).toDateString()]: [`Project End: ${project.name}`],
        };
      }
      setTasks(prevTasks => ({ ...prevTasks, ...tasksData }));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/calendar/events');
      const events = await response.json();

      let tasksData = {};
      for (let event of events) {
        const eventDate = new Date(event.eventDate).toDateString();
        tasksData[eventDate] = tasksData[eventDate] || [];
        tasksData[eventDate].push(event.description);
      }
      setTasks(prevTasks => ({ ...prevTasks, ...tasksData }));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

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
  );
};

export default CalendarComponent;
