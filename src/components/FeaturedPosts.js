import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';

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

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const listRes = await fetch('/postlist.json');
        const { posts: fileList } = await listRes.json();

        const postPromises = fileList.map(async file => {
          const res = await fetch(`${process.env.PUBLIC_URL}/content/${file}`);
          const markdown = await res.text();
          const parsedPost = parseFrontmatter(markdown);
          return {
            slug: file.replace('.md', ''),
            ...parsedPost
          };
        });

        const allPosts = await Promise.all(postPromises);
        const featured = allPosts.filter(post => post.featured === 'true' || post.featured === 'yes');
        
        setFeaturedPosts(featured);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
        setError('Failed to fetch featured posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  if (loading) return <div>Loading featured posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="featured-posts">
      <h2>Featured Posts</h2>
      {featuredPosts.length === 0 ? (
        <p>No featured posts found.</p>
      ) : (
        featuredPosts.map(post => (
          <BlogPost
            key={post.slug}
            slug={post.slug}
            title={post.title || 'Untitled'}
            date={post.date || 'No date'}
            excerpt={post.content.substring(0, 150) + '...'}
            thumbnail={post.thumbnail || ''}
          />
        ))
      )}
    </div>
  );
};

export default FeaturedPosts;