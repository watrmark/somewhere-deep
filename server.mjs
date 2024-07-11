import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;
const router = express.Router();

app.use(cors());
app.use(express.json());

const postsDirectory = path.join(__dirname, 'src', 'content', 'posts');

// Helper function to read posts
const getPosts = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ''),
      ...data,
      content
    };
  });
};

// Test route
router.get('/test', (req, res) => {
  console.log('Received request to /test');
  res.json({ message: 'API is working' });
});

// Posts route
router.get('/posts', (req, res) => {
  console.log('Received request to /posts');
  const posts = getPosts();
  res.json(posts.map(({ content, ...rest }) => rest)); // Exclude content for list view
});

// Single post route
router.get('/posts/:slug', (req, res) => {
  console.log(`Received request to /posts/${req.params.slug}`);
  const posts = getPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Featured posts route
router.get('/featured-posts', (req, res) => {
  console.log('Received request to /featured-posts');
  const posts = getPosts();
  const featuredPosts = posts.filter(post => post.featured);
  res.json(featuredPosts.map(({ content, ...rest }) => rest)); // Exclude content for list view
});

// Use the router for /api routes
app.use('/api', router);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// The "catchall" handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;