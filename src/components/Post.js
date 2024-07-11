import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '' // Use empty string for relative URLs in production
  : 'http://localhost:5001'; // Use this for local development

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      fetch(`${API_URL}/api/posts/${slug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Post not found');
          }
          return response.json();
        })
        .then(data => {
          setPost(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError('No slug provided');
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="full-post">
      {post.thumbnail && (
        <img src={post.thumbnail} alt={post.title} className="post-thumbnail" />
      )}
      <h1>{post.title}</h1>
      <p className="date">{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default Post;