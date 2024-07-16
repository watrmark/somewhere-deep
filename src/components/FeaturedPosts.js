import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';
import { fetchPosts } from '../services/postServices.js';

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeaturedPosts = async () => {
      try {
        const data = await fetchPosts();
        const featured = data.filter(post => {
          const frontmatter = post.content.trim().split('\n');
          const featuredLine = frontmatter.find(line => line.startsWith('featured:'));
          return featuredLine && (featuredLine.includes('true') || featuredLine.includes('yes'));
        });
        setFeaturedPosts(featured);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
        setError('Failed to fetch featured posts. Please try again later.');
        setLoading(false);
      }
    };

    getFeaturedPosts();
  }, []);

  if (loading) return <div>Loading featured posts...</div>;
  if (error) return <div>{error}</div>;

  const getField = (content, field) => {
    const frontmatter = content.trim().split('\n');
    const line = frontmatter.find(line => line.startsWith(`${field}:`));
    return line ? line.replace(`${field}:`, '').trim().replace(/^["']|["']$/g, '') : '';
  };

  return (
    <div className="featured-posts">
      <h2>Featured Posts</h2>
      {featuredPosts.length === 0 ? (
        <p>No featured posts found.</p>
      ) : (
        featuredPosts.map(post => {
          console.log(post.content);
          const title = getField(post.content, 'title') || 'Untitled';
          const date = getField(post.content, 'date') || 'No date';
          const thumbnail = getField(post.content, 'thumbnail') || '';
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

export default FeaturedPosts;