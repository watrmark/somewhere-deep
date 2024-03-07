const express = require('express');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/api/posts', (req, res) => {
  const postsDirectory = path.join(__dirname, '../posts');

  // Read the list of directories in the posts directory
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
              summary: data.summary || '', // Add the summary field
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});