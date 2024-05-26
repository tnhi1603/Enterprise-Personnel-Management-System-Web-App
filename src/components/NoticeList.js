import React from 'react';

function NoticeList({ notices }) {
  return (
    <ul>
      {notices.map((notice) => (
        <li key={notice.id}>
          <span>{notice.title}</span>
          <span>{notice.date}</span>
        </li>
      ))}
    </ul>
  );
}

export default NoticeList;
