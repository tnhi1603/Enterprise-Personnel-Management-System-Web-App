import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
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
import ProtectedRoute from './components/ProtectedRoute';
import Notification from './components/Notification';
import NotificationDetail from './components/NotificationDetail';
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
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project"
            element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Request />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interactions"
            element={
              <ProtectedRoute>
                <InteractionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarComponent tasks={tasks} onSelectDate={handleSelectDate} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <ProtectedRoute>
                <EmployeeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_employee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_project"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
          path="/notification/:id"
          element={
            <ProtectedRoute>
              <NotificationDetail />
            </ProtectedRoute>
          }
        />
          <Route path="/" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
