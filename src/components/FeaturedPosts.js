import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';
import { fetchFeaturedPosts } from '../services/featuredPostServices.js';

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeaturedPosts = async () => {
      try {
        const data = await fetchFeaturedPosts();
        console.log('Featured Posts Data:', data);
        setFeaturedPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setFeaturedPosts([]);
        setLoading(false);
      }
    };

    getFeaturedPosts();
  }, []);

  if (loading) {
    return <div>Loading featured posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (featuredPosts.length === 0) {
    return <p>No featured posts found.</p>;
  }

  return (
    <div className="featured-posts">
      {featuredPosts.map(post => (
        <BlogPost
          key={post.id}
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