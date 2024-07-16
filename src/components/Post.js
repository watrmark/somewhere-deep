import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchPostContent } from '../services/postServices';

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPostContent(slug);
        const frontmatter = data.content.split('---')[1].trim().split('\n');
        const content = data.content.split('---').slice(2).join('---').trim();
        
        const getField = (field) => {
          const line = frontmatter.find(line => line.startsWith(`${field}:`));
          return line ? line.replace(`${field}:`, '').trim().replace(/^["']|["']$/g, '') : '';
        };

        setPost({
          title: getField('title'),
          date: getField('date'),
          thumbnail: getField('thumbnail'),
          content: content
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch post. Please try again later.');
        setLoading(false);
      }
    };

    getPost();
  }, [slug]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;
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