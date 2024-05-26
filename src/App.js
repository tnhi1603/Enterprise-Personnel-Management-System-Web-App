import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard'
import Project from './components/Project';
import Footer from './components/Footer';
import Request from './components/Request';
import Login from './components/Login';
import Register from './components/Register';
import CalendarComponent from './components/CalendarComponent';
import InteractionPage from './components/InteractionPage';
import './App.css'; 

function App() {
  const tasks = {
    'Sun May 26 2024': ['Task 1', 'Task 2'],
    'Tue May 28 2024': ['Task 3'],
  };

  const handleSelectDate = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <div className="App">
 <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project" element={<Project />} />
          <Route path="/" element={<Header />} />
          <Route path="/" element={<Footer />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interactions" element={<InteractionPage />} />
          <Route path="/calendar"
              element={<CalendarComponent tasks={tasks} onSelectDate={handleSelectDate} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

