// src/pages/Posts.js
import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost.js';

const API_URL = process.env.NODE_ENV === 'production'
  ? (process.env.REACT_APP_API_URL || '')
  : 'http://localhost:5001';

const mockPosts = [
  {
    slug: 'mock-post-1',
    title: 'Mock Post 1',
    date: '2024-07-11',
    excerpt: 'This is a mock post for testing purposes.',
    thumbnail: '/images/default-thumbnail.jpg'
  },
  {
    slug: 'mock-post-2',
    title: 'Mock Post 2',
    date: '2024-07-12',
    excerpt: 'This is another mock post for testing purposes.',
    thumbnail: '/images/default-thumbnail.jpg'
  }
];

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        setPosts(mockPosts); 
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="posts-list">
      <h1>All Posts</h1>
      {error && <div className="error-message">{error}</div>}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <BlogPost
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            thumbnail={post.thumbnail}
          />
        ))
      )}
    </div>
  );
};

export default Posts;