import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/featured-posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFeaturedPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching featured posts:', error);
        setError('Failed to load featured posts. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading featured posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="featured-posts">
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