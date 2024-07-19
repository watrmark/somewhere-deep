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
      try {
        console.log('Fetching postList.json');
        const listRes = await fetch('/postList.json');
        if (!listRes.ok) {
          throw new Error(`Failed to fetch postList.json: ${listRes.status} ${listRes.statusText}`);
        }
        const data = await listRes.json();
        console.log('postList.json data:', data);
  
        const { posts: fileList } = data;
        console.log('File list:', fileList);
  
        const postPromises = fileList.map(async file => {
          console.log(`Fetching content for: ${file}`);
          try {
            const res = await fetch(`${process.env.PUBLIC_URL}/${file}.md`);
            if (!res.ok) {
              throw new Error(`Failed to fetch ${file}: ${res.status} ${res.statusText}`);
            }
            const markdown = await res.text();
            console.log(`Markdown content for ${file} (first 100 chars):`, markdown.substring(0, 100));
            const { content, ...frontmatter } = parseFrontmatter(markdown);
            console.log(`Parsed frontmatter for ${file}:`, frontmatter);
            return {
              slug: file.replace('.md', '').replace('content/', ''),
              ...frontmatter,
              content
            };
          } catch (error) {
            console.error(`Error fetching ${file}:`, error);
            return null; // or handle the error as appropriate for your app
          }
        });
  
        const fetchedPosts = await Promise.all(postPromises);
        console.log('All fetched posts:', fetchedPosts);
        setPosts(fetchedPosts.filter(post => post !== null)); // Remove any null entries from failed fetches
      } catch (error) {
        console.error('Error in fetchPosts:', error);
      }
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