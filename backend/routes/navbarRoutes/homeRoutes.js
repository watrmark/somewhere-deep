import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  const homeFilePath = path.join(__dirname, '../../models/home/home.md');
  fs.readFile(homeFilePath, 'utf8', (err, content) => {
    if (err) {
      console.error('Error reading home file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const { content: markdownContent } = matter(content);
    res.json({ content: markdownContent });
  });
});

export default router;