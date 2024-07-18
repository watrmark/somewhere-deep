import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost.js';

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

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const listRes = await fetch(`${process.env.PUBLIC_URL}/postlist.json`);
      const { posts: fileList } = await listRes.json();

      const postPromises = fileList.map(async file => {
        const res = await fetch(`${process.env.PUBLIC_URL}/content/${file}`);
        const markdown = await res.text();
        const { content, ...frontmatter } = parseFrontmatter(markdown);
        return {
          slug: file.replace('.md', ''),
          ...frontmatter,
          content
        };
      });

      const fetchedPosts = await Promise.all(postPromises);
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-list">
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map(post => (
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

export default Posts;