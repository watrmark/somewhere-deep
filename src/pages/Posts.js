import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost.js';
import { fetchPosts } from '../services/postServices.js';

const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

const mockPosts = [
  {
    slug: 'mock-post-1',
    title: 'Mock Post 1',
    date: '2024-07-11',
    excerpt: 'This is a mock post for testing purposes.',
    thumbnail: '/images/bingopolisthumbnail.png'
  },
  {
    slug: 'mock-post-2',
    title: 'Mock Post 2',
    date: '2024-07-12',
    excerpt: 'This is another mock post for testing purposes.',
    thumbnail: '/images/bingopolisthumbnail.png'
  }
];

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getPosts();
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
            key={post.id}
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

console.log('API URL:', `${API_URL}/api/posts`);

export default Posts;