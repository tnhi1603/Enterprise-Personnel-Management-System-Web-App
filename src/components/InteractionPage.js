import React, { useState } from 'react';
import Post from './Post';
import './InteractionPage.css';

const initialPosts = [
  {
    id: 1,
    author: 'User 1',
    content: 'This is the first post',
    likes: 0,
    comments: [],
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    author: 'User 2',
    content: 'This is the second post',
    likes: 0,
    comments: [],
    timestamp: new Date().toLocaleString(),
  },
];

function InteractionPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');

  const handlePostContentChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: 'New User', // This can be dynamic based on actual logged-in user data
        content: newPostContent,
        likes: 0,
        comments: [],
        timestamp: new Date().toLocaleString(),
      };
      setPosts([newPost, ...posts]); // Prepend the new post
      setNewPostContent('');
    }
  };

  return (
      <div className="interaction-page">
        <form onSubmit={handlePostSubmit} className="post-form">
          <textarea
            value={newPostContent}
            onChange={handlePostContentChange}
            placeholder="Write your post here..."
          />
          <button type="submit">Post</button>
        </form>
        <div className="posts">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
  );
}

export default InteractionPage;
