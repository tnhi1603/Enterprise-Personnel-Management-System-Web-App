import React, { useState } from 'react';
import './Post.css';

const Post = ({ post }) => {
  const [replyContent, setReplyContent] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      try {
        const response = await fetch('http://localhost:3001/api/post/replies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: post.id, staffId: 1, content: replyContent }),
        });
        const newReply = await response.json();
        setComments([...comments, { id: newReply.id, author: 'New User', content: replyContent }]);
        setReplyContent('');
      } catch (error) {
        console.error('Error creating reply:', error);
      }
    }
  };

  return (
    <div className="post">
      <div className="post-content">
        <div className="post-author">{post.author}</div>
        <div className="post-text">{post.content}</div>
        <div className="post-timestamp">{post.timestamp}</div>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-author">{comment.author}</div>
            <div className="comment-text">{comment.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleReplySubmit} className="reply-form">
        <textarea
          value={replyContent}
          onChange={handleReplyContentChange}
          placeholder="Write your reply here..."
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default Post;
