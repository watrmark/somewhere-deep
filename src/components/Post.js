import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const parseFrontmatter = (markdown) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) return { content: markdown };

  const frontmatter = match[1];
  const content = markdown.replace(frontmatterRegex, '');

  const metadata = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value) metadata[key.trim()] = value.join(':').trim();
  });

  return { ...metadata, content };
};

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/content/${slug}.md`);
        const markdown = await res.text();
        const parsedPost = parseFrontmatter(markdown);
        setPost(parsedPost);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  // Function to resolve image paths
  const resolveImagePath = (path) => {
    if (path.startsWith('/')) {
      return path; // Absolute path, use as is
    } else {
      return `/${path}`; // Relative path, add leading slash
    }
  };

  return (
    <article className="full-post">
      {post.thumbnail && (
        <img src={resolveImagePath(post.thumbnail)} alt={post.title} className="post-thumbnail" />
      )}
      <h1>{post.title}</h1>
      <p className="date">{post.date}</p>
      <ReactMarkdown
        components={{
          img: ({node, ...props}) => <img {...props} src={resolveImagePath(props.src)} />
        }}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
};

export default Post;