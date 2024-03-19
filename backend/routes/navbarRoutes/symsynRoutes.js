import express from 'express';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  const symsynDirectory = path.join(__dirname, '../../models/symsyn');

  // Read the list of files in the symsyn directory
  fs.readdir(symsynDirectory, (err, files) => {
    if (err) {
      console.error('Error reading symsyn directory:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Filter out .DS_Store files and other non-directory files
    const directories = files.filter((file) => {
      const filePath = path.join(symsynDirectory, file);
      return fs.statSync(filePath).isDirectory();
    });

    const symsynItems = [];

    directories.forEach((directory) => {
      const symsynItemDirectory = path.join(symsynDirectory, directory);

      // Read the list of files in the symsyn item directory
      fs.readdir(symsynItemDirectory, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${symsynItemDirectory}:`, err);
          return;
        }

        // Find the first Markdown file in the symsyn item directory
        const markdownFile = files.find((file) => path.extname(file) === '.md');

        if (markdownFile) {
          const symsynItemPath = path.join(symsynItemDirectory, markdownFile);

          // Read the contents of the Markdown file
          fs.readFile(symsynItemPath, 'utf8', (err, content) => {
            if (err) {
              console.error(`Error reading file ${symsynItemPath}:`, err);
              return;
            }

            // Parse the Markdown file using gray-matter
            const { data, content: markdownContent } = matter(content);

            // Extract the necessary data from the front matter
            const symsynItem = {
              title: data.title || '',
              date: data.date || '',
              summary: data.summary || '',
              slug: directory,
              content: markdownContent,
            };

            symsynItems.push(symsynItem);

            // Check if all files have been read
            if (symsynItems.length === directories.length) {
              res.json(symsynItems);
            }
          });
        }
      });
    });
  });
});

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const symsynItemDirectory = path.join(__dirname, '../../models/symsyn', slug);

  // Read the list of files in the symsyn item directory
  fs.readdir(symsynItemDirectory, (err, files) => {
    if (err) {
      console.error(`Error reading symsyn item directory for slug ${slug}:`, err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Find the first Markdown file in the symsyn item directory
    const markdownFile = files.find((file) => path.extname(file) === '.md');

    if (markdownFile) {
      const symsynItemPath = path.join(symsynItemDirectory, markdownFile);

      // Read the contents of the Markdown file
      fs.readFile(symsynItemPath, 'utf8', (err, content) => {
        if (err) {
          console.error(`Error reading file ${symsynItemPath}:`, err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        // Parse the Markdown file using gray-matter
        const { data, content: markdownContent } = matter(content);

        // Extract the necessary data from the front matter
        const symsynItem = {
          title: data.title || '',
          date: data.date || '',
          content: markdownContent,
        };

        res.json(symsynItem);
      });
    } else {
      res.status(404).json({ error: 'Symsyn item not found' });
    }
  });
});

export default router;