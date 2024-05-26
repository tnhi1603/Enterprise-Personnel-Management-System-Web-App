import React from 'react';
import './NoticeItem.css';

function NoticeItem({ title, date }) {
  return (
    <div className="notice-item">
      <span className="notice-title">{title}</span>
      <span className="notice-date">{date}</span>
    </div>
  );
}

export default NoticeItem;
