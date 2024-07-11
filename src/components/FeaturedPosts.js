import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/featured-posts');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        const data = await response.json();
        setFeaturedPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
        setError(`Failed to load featured posts: ${error.message}`);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading featured posts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (featuredPosts.length === 0) return <div>No featured posts available.</div>;

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