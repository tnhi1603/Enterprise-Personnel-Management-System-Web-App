import React, { useState } from 'react';
import Comment from './Comment';
import './Post.css';

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText) {
      setComments([...comments, { text: commentText }]);
      setCommentText('');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-author">{post.author}</span>
        <span className="post-timestamp">{post.timestamp}</span>
      </div>
      <div className="post-content">
        {post.content}
      </div>
      <button onClick={handleLike}>Like ({likes})</button>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button type="submit">Comment</button>
      </form>
      <div className="comments">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default Post;