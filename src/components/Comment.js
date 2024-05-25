import React from 'react';
import './Comment.css';

function Comment({ comment }) {
  return (
    <div className="comment">
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;
