import React from 'react';
import './StatCard.css';

function StatCard({ count, label, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{count}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default StatCard;
