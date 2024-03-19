import express from 'express';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  const guidesDirectory = path.join(__dirname, '../../models/guides');

  fs.readdir(guidesDirectory, (err, files) => {
    if (err) {
      console.error('Error reading guides directory:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const folders = files.filter((file) => {
      const filePath = path.join(guidesDirectory, file);
      return fs.statSync(filePath).isDirectory();
    });

    const guides = [];

    folders.forEach((folder) => {
      const guideDirectory = path.join(guidesDirectory, folder);

      fs.readdir(guideDirectory, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${guideDirectory}:`, err);
          return;
        }

        const markdownFile = files.find((file) => path.extname(file) === '.md');

        if (markdownFile) {
          const guidePath = path.join(guideDirectory, markdownFile);

          fs.readFile(guidePath, 'utf8', (err, content) => {
            if (err) {
              console.error(`Error reading file ${guidePath}:`, err);
              return;
            }

            const { data, content: markdownContent } = matter(content);

            const guide = {
              title: data.title || '',
              date: data.date || '',
              summary: data.summary || '',
              slug: folder,
              content: markdownContent,
            };

            guides.push(guide);

            if (guides.length === folders.length) {
              console.log('Server response:', guides);
              res.json(guides);
            }
          });
        }
      });
    });
  });
});

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const guideDirectory = path.join(__dirname, '../../models/guides', slug);

  fs.readdir(guideDirectory, (err, files) => {
    if (err) {
      console.error(`Error reading guide directory for slug ${slug}:`, err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const markdownFile = files.find((file) => path.extname(file) === '.md');

    if (markdownFile) {
      const guidePath = path.join(guideDirectory, markdownFile);

      fs.readFile(guidePath, 'utf8', (err, content) => {
        if (err) {
          console.error(`Error reading file ${guidePath}:`, err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        const { data, content: markdownContent } = matter(content);

        const guide = {
          title: data.title || '',
          date: data.date || '',
          content: markdownContent,
        };

        res.json(guide);
      });
    } else {
      res.status(404).json({ error: 'Guide not found' });
    }
  });
});

export default router;