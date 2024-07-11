import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';

const mockPosts = [
  {
    slug: 'mock-post-1',
    title: 'Mock Featured Post 1',
    date: '2024-07-11',
    excerpt: 'This is a mock featured post for testing purposes.',
    thumbnail: '/images/default-thumbnail.jpg'
  },
  {
    slug: 'mock-post-2',
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
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/featured-posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeaturedPosts(data);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
        // Use mock data when API is not available
        setFeaturedPosts(mockPosts);
        setError('Unable to fetch real data. Displaying mock posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading featured posts...</div>;

  return (
    <div className="featured-posts">
      {error && <div className="error-message">{error}</div>}
      {featuredPosts.map(post => (
        <BlogPost
          key={post.slug}
          slug={post.slug}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
          thumbnail={post.thumbnail}
        />
      ))}
    </div>
  );
};

export default FeaturedPosts;