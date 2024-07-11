// src/pages/Posts.js
import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost.js';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="posts-list">
      <h1>All Posts</h1>
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