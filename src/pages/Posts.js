import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost.js';
import { fetchPosts } from '../services/postServices.js';

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
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="posts-list">
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => {
          const frontmatter = post.content.trim().split('\n');
          const getField = (field) => {
            const line = frontmatter.find(line => line.startsWith(`${field}:`));
            return line ? line.replace(`${field}:`, '').trim().replace(/^["']|["']$/g, '') : '';
          };
        
          const title = getField('title') || 'Untitled';
          const date = getField('date') || 'No date';
          const thumbnail = getField('thumbnail') || '';
          const excerpt = post.content.split('---')[2]?.trim().substring(0, 150) + '...' || '';
        
          return (
            <BlogPost
              key={post.slug}
              slug={post.slug}
              title={title}
              date={date}
              excerpt={excerpt}
              thumbnail={thumbnail}
            />
          );
        })
      )}
    </div>
  );
};

export default Posts;