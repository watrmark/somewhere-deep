import express from 'express';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  const postsDirectory = path.join(__dirname, '../../models/posts');

  // Read the list of files in the posts directory
  fs.readdir(postsDirectory, (err, files) => {
    if (err) {
      console.error('Error reading posts directory:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Filter out .DS_Store files and other non-directory files
    const directories = files.filter((file) => {
      const filePath = path.join(postsDirectory, file);
      return fs.statSync(filePath).isDirectory();
    });

    const posts = [];

    directories.forEach((directory) => {
      const postDirectory = path.join(postsDirectory, directory);

      // Read the list of files in the post directory
      fs.readdir(postDirectory, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${postDirectory}:`, err);
          return;
        }

        // Find the first Markdown file in the post directory
        const markdownFile = files.find((file) => path.extname(file) === '.md');

        if (markdownFile) {
          const postPath = path.join(postDirectory, markdownFile);

          // Read the contents of the Markdown file
          fs.readFile(postPath, 'utf8', (err, content) => {
            if (err) {
              console.error(`Error reading file ${postPath}:`, err);
              return;
            }

            // Parse the Markdown file using gray-matter
            const { data, content: markdownContent } = matter(content);

            // Extract the necessary data from the front matter
            const post = {
              title: data.title || '',
              date: data.date || '',
              summary: data.summary || '',
              slug: directory,
              content: markdownContent,
            };

            posts.push(post);

            // Check if all files have been read
            if (posts.length === directories.length) {
              res.json(posts);
            }
          });
        }
      });
    });
  });
});

export default router;