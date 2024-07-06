import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './StatCard';
import EventList from './EventList';
import NoticeList from './NoticeList';
import './Dashboard.css';
import { FaUsers, FaTasks } from 'react-icons/fa';
import { MdOutlinePendingActions } from "react-icons/md";

function Dashboard() {
  const [onlineMembers, setOnlineMembers] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          onlineMembersRes,
          activeProjectsRes,
          pendingRequestsRes,
          eventListRes,
          noticeListRes
        ] = await Promise.all([
          axios.get('http://localhost:3001/api/dashboard/members/online'),
          axios.get('http://localhost:3001/api/dashboard/projects/active'),
          axios.get('http://localhost:3001/api/dashboard/requests/pending'),
          axios.get('http://localhost:3001/api/dashboard/events'),
          axios.get('http://localhost:3001/api/dashboard/notices')
        ]);

        const sortedEvents = eventListRes.data.sort((b, a) => new Date(a.date) - new Date(b.date));
        const sortedNotices = noticeListRes.data.sort((a, b) => new Date(a.date) - new Date(b.date));

        setOnlineMembers(onlineMembersRes.data.onlineMembers);
        setActiveProjects(activeProjectsRes.data.activeProjects);
        setPendingRequests(pendingRequestsRes.data.pendingRequests);
        setEvents(sortedEvents);
        setNotices(sortedNotices);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="dashboard">
        <div className="stats">
          <StatCard count={onlineMembers} label="Members" icon={<FaUsers />} />
          <StatCard count={activeProjects} label="Projects" icon={<FaTasks />} />
          <StatCard count={pendingRequests} label="Requests" icon={<MdOutlinePendingActions />} />
        </div>
        <div className="lists">
          <div className="list">
            <h2>Events</h2>
            <EventList events={events} />
          </div>
          <div className="list">
            <h2>Notice</h2>
            <NoticeList notices={notices} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
