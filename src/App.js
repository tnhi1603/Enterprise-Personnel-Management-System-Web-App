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
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';
import AddProject from './components/AddProject';
import ProjectDetails from './components/ProjectDetails';
import './App.css'; 

function App() {
  const tasks = {
    'Sat Jun 15 2024': ['Deadline Project Beta', 'Task from Department BA'],
    'Mon Jun 10 2024': ['Deadline Project Alpha'],
    'Sun Jun 2 2024': ['Deadline Project Beta', 'Task from Department BA'],
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
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add_employee" element={<AddEmployee />} />
          <Route path="/add_project" element={<AddProject />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

