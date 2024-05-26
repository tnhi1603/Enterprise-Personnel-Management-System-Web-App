import React from 'react';
import StatCard from './StatCard';
import EventList from './EventList';
import NoticeList from './NoticeList';
import Header from './Header';
import Footer from './Footer';
import './Dashboard.css';
import { FaUsers, FaTasks } from 'react-icons/fa';
import { MdOutlinePendingActions } from "react-icons/md";

const mockEvents = [
  { name: 'Event 1', date: '2024-05-01' },
  { name: 'Event 2', date: '2024-05-02' },
  { name: 'Event 3', date: '2024-05-03' },
];

const mockNotices = [
  { title: 'Notice 1', date: '2024-05-01' },
  { title: 'Notice 2', date: '2024-05-02' },
  { title: 'Notice 3', date: '2024-05-03' },
];

function Dashboard() {
  return (
    <div className="page">
    <div><Header /></div>
    <div className="dashboard">
      <div className="stats">
        <StatCard count="00" label="Members" icon={<FaUsers />} />
        <StatCard count="00" label="Projects" icon={<FaTasks />} />
        <StatCard count="00" label="Requests" icon={<MdOutlinePendingActions />} />
      </div>
      <div className="lists">
        <div className="list">
          <h2>Events</h2>
          <EventList events={mockEvents} />
        </div>
        <div className="list">
          <h2>Notice</h2>
          <NoticeList notices={mockNotices} />
        </div>
      </div>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default Dashboard;
