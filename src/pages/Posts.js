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
    const fetchWithFallback = async (path) => {
      console.log(`Fetching ${path}`);
      try {
        const res = await fetch(path);
        if (!res.ok) {
          console.error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
          throw new Error(`Failed to fetch ${path}`);
        }
        return await res.text();
      } catch (error) {
        console.error(`Error fetching ${path}, trying without extension`);
        const fallbackPath = path.replace('.md', '');
        console.log(`Fetching ${fallbackPath}`);
        const res = await fetch(fallbackPath);
        if (!res.ok) {
          console.error(`Failed to fetch ${fallbackPath}: ${res.status} ${res.statusText}`);
          throw new Error(`Failed to fetch ${fallbackPath}`);
        }
        return await res.text();
      }
    };

    const fetchPosts = async () => {
      try {
        console.log('Fetching postList.json');
        const listRes = await fetch(`${process.env.PUBLIC_URL}/postList.json`);
        if (!listRes.ok) {
          console.error(`Failed to fetch postList.json: ${listRes.status} ${listRes.statusText}`);
          throw new Error(`Failed to fetch postList.json`);
        }
        const data = await listRes.json();
        console.log('postList.json data:', data);

        const { posts: fileList } = data;
        console.log('File list:', fileList);

        const postPromises = fileList.map(async file => {
          console.log(`Fetching content for: ${file}`);
          try {
            const markdown = await fetchWithFallback(`${process.env.PUBLIC_URL}/content/${file}`);
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
            return null;
          }
        });

        const fetchedPosts = await Promise.all(postPromises);
        console.log('All fetched posts:', fetchedPosts);
        setPosts(fetchedPosts.filter(post => post !== null));
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
