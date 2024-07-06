import React from 'react';
import './NoticeList.css';

const NoticeList = ({ notices = [] }) => {
  return (
    <table className="notice-table">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice) => (
          <tr key={notice.NoticeID} className="notice-item">
            <td><a href={`/notification/${notice.NoticeID}`}>{notice.NoticeTitle}</a></td>
            <td>{new Date(notice.NoticeDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NoticeList;
