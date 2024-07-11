// server/server.mjs
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const cors = require('cors');
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
// API route for all posts
app.get('/api/posts', (req, res) => {
  const postsDirectory = path.join(__dirname, '../src', 'content', 'posts');

  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory not found: ${postsDirectory}`);
    return res.json([]);
  }

  try {
    const postFiles = fs.readdirSync(postsDirectory);
    const posts = postFiles
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        return {
          slug: filename.replace('.md', ''),
          title: data.title || 'Untitled',
          date: data.date || 'No date',
          excerpt: data.excerpt || content.slice(0, 100) + '...',
          thumbnail: data.thumbnail || '/images/default-thumbnail.jpg' // Add this line
        };
      });

    res.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/posts/:slug', (req, res) => {
  const { slug } = req.params;
  const postsDirectory = path.join(__dirname, '../src', 'content', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const contentLines = content.split('\n');
    const contentWithoutTitle = contentLines[0].startsWith('# ') ?
      contentLines.slice(1).join('\n') : content;

    res.json({
      slug,
      title: data.title || 'Untitled',
      date: data.date || 'No date',
      content: contentWithoutTitle,
      thumbnail: data.thumbnail || '/images/default-thumbnail.jpg' // Add this line
    });
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// In your server.mjs file

app.get('/api/featured-posts', (req, res) => {
  const postsDirectory = path.join(__dirname, '../src', 'content', 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory not found: ${postsDirectory}`);
    return res.json([]);
  }

  try {
    const postFiles = fs.readdirSync(postsDirectory);
    const posts = postFiles
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        return {
          slug: filename.replace('.md', ''),
          title: data.title || 'Untitled',
          date: data.date || 'No date',
          excerpt: data.excerpt || content.slice(0, 100) + '...',
          thumbnail: data.thumbnail || '/images/default-thumbnail.jpg',
          featured: data.featured || false
        };
      })
      .filter(post => post.featured);
    
    res.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 5001;
app.listen(port);

console.log(`Server listening on ${port}`);