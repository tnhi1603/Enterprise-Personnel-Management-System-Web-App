import React from 'react';
import './NoticeList.css';

function NoticeList({ notices }) {
  return (
    <ul className="notice-list">
      {notices.map(notice => (
        <li key={notice.id} className="notice-item">
          <h3>{notice.title}</h3>
          <p>{notice.description}</p>
          <span>{new Date(notice.date).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}

export default NoticeList;
