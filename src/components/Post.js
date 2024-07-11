import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
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
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  // Remove the first line (title) from the content
  const contentWithoutTitle = post.content.split('\n').slice(1).join('\n');

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="full-post">
      <img src={post.thumbnail} alt={post.title} className="post-thumbnail" />
      <h1>{post.title}</h1>
      <p className="date">{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default Post;