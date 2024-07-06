import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [tasks, setTasks] = useState({});
  const [details, setDetails] = useState({});
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchEvents();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/calendar/projects'); // Adjust the URL as needed
      const projects = await response.json();

      let tasksData = {};
      let detailsData = {};
      for (let project of projects) {
        const startDateString = new Date(project.StartDay).toDateString();
        const endDateString = new Date(project.EndDay).toDateString();

        tasksData[startDateString] = tasksData[startDateString] || [];
        tasksData[startDateString].push(`Bắt đầu: ${project.ProjectName}`);

        tasksData[endDateString] = tasksData[endDateString] || [];
        tasksData[endDateString].push(`Deadline: ${project.ProjectName}`);

        detailsData[`Bắt đầu: ${project.ProjectName}`] = project;
        detailsData[`Deadline: ${project.ProjectName}`] = project;
      }
      setTasks(prevTasks => ({ ...prevTasks, ...tasksData }));
      setDetails(prevDetails => ({ ...prevDetails, ...detailsData }));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/calendar/events'); // Adjust the URL as needed
      const events = await response.json();
  
      let tasksData = {};
      let detailsData = {};

      const uniqueEventDates = new Set();
  
      for (let event of events) {
        const eventDateString = new Date(event.EventDate).toDateString();
  
        if (!uniqueEventDates.has(eventDateString)) {
          uniqueEventDates.add(eventDateString);
  
          tasksData[eventDateString] = tasksData[eventDateString] || [];
          tasksData[eventDateString].push(`Sự kiện: ${event.EventName}`);
  
          detailsData[`Sự kiện: ${event.EventName}`] = event;
        }
      }
  
      setTasks(prevTasks => ({ ...prevTasks, ...tasksData }));
      setDetails(prevDetails => ({ ...prevDetails, ...detailsData }));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedTasks(tasks[date.toDateString()] || []);
    setSelectedDetail(null); 
  };

  const handleTaskClick = (task) => {
    setSelectedDetail(details[task]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
            <li key={index} onClick={() => handleTaskClick(task)}>
              {task}
            </li>
          ))}
        </ul>
        {selectedDetail && (
          <div className="task-detail">
            <h3>Detail View</h3>
            {selectedDetail.ProjectName && (
              <p><strong>Project Name:</strong> {selectedDetail.ProjectName}</p>
            )}
            {selectedDetail.StartDay && (
              <p><strong>Start Date:</strong> {formatDate(selectedDetail.StartDay)}</p>
            )}
            {selectedDetail.EndDay && (
              <p><strong>End Date:</strong> {formatDate(selectedDetail.EndDay)}</p>
            )}
            {selectedDetail.Progress && (
              <p><strong>Progress:</strong> {(selectedDetail.Progress)}%</p>
            )}
            {selectedDetail.EventName && (
              <p><strong>Event Name:</strong> {selectedDetail.EventName}</p>
            )}
            {selectedDetail.EventDate && (
              <p><strong>Event Date:</strong> {formatDate(selectedDetail.EventDate)}</p>
            )}
            {selectedDetail.details && (
              <p><strong>Details:</strong> {selectedDetail.details}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
