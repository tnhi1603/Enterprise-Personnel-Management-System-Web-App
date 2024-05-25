import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Project from './components/Project';
import Footer from './components/Footer';
import Request from './components/Request';
import Login from './components/Login';
import Register from './components/Register';
import InteractionPage from './components/InteractionPage';
import './App.css'; 

function App() {
  return (
    <div className="App">
 <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/" element={<Header />} />
          <Route path="/" element={<Footer />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interactions" element={<InteractionPage />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

