import React from 'react';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Menu />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;

