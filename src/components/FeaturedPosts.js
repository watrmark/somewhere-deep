// src/components/FeaturedPosts.js
import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';

const API_URL = process.env.NODE_ENV === 'production'
  ? (process.env.REACT_APP_API_URL || '')
  : 'http://localhost:5001';

const mockFeaturedPosts = [
  {
    slug: 'mock-featured-1',
    title: 'Mock Featured Post 1',
    date: '2024-07-11',
    excerpt: 'This is a mock featured post for testing purposes.',
    thumbnail: '/images/default-thumbnail.jpg'
  },
  {
    slug: 'mock-featured-2',
    title: 'Mock Featured Post 2',
    date: '2024-07-12',
    excerpt: 'This is another mock featured post for testing purposes.',
    thumbnail: '/images/default-thumbnail.jpg'
  }
];

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/featured-posts`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setFeaturedPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        setFeaturedPosts(mockFeaturedPosts);
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  if (loading) return <div>Loading featured posts...</div>;

  return (
    <div className="featured-posts">
      {error && <div className="error-message">{error}</div>}
      {featuredPosts.length === 0 ? (
        <p>No featured posts found.</p>
      ) : (
        featuredPosts.map(post => (
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

export default FeaturedPosts;