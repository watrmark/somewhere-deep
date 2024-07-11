// src/pages/Posts.js
import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost.js';

// Mock data to display when API is unavailable
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
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch posts. Displaying mock data.");
        setPosts(mockPosts);
      } finally {
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