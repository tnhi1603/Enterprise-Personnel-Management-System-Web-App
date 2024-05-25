import React, { useState } from 'react';
import Post from './Post';
import Header from './Header.js';
import Footer from './Footer.js';
import './InteractionPage.css';

const initialPosts = [
  {
    id: 1,
    author: 'User 1',
    content: 'This is the first post',
    likes: 0,
    comments: []
  },
  {
    id: 2,
    author: 'User 2',
    content: 'This is the second post',
    likes: 0,
    comments: []
  }
];

function InteractionPage() {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="page">
    <div><Header /></div>
    <div className="interaction-page">
      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default InteractionPage;
