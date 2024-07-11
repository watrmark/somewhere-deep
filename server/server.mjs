import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  console.log('Received request to /api/test');
  res.json({ message: 'API is working' });
});

// Simple posts route
app.get('/api/posts', (req, res) => {
  console.log('Received request to /api/posts');
  res.json([
    { id: 1, title: 'Test Post 1', content: 'This is a test post.' },
    { id: 2, title: 'Test Post 2', content: 'This is another test post.' }
  ]);
});

// Simple featured posts route
app.get('/api/featured-posts', (req, res) => {
  console.log('Received request to /api/featured-posts');
  res.json([
    { id: 1, title: 'Featured Test Post', content: 'This is a featured test post.' }
  ]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;