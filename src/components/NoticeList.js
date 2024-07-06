import React from 'react';
import './NoticeList.css';

const NoticeList = ({ notices = [] }) => {
  return (
    <table className="notice-table">
      <thead>
        <tr>
          <th>Tên Thông Báo</th>
          <th>Ngày Thông Báo</th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice) => (
          <tr key={notice.NoticeID} className="notice-item">
            <td><a href={`/notices/${notice.NoticeID}`}>{notice.NoticeTitle}</a></td>
            <td>{new Date(notice.NoticeDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NoticeList;
