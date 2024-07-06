import React, { useState, useEffect } from 'react';
import Post from './Post';
import './InteractionPage.css';

const InteractionPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [staffId, setStaffId] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/post');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostContentChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      try {
        const response = await fetch('http://localhost:3001/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ staffId, content: newPostContent }),
        });
        const newPost = await response.json();
        fetchPosts(); // Refresh posts after adding new one
        setNewPostContent('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
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
};

export default InteractionPage;
