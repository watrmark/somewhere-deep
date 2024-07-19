const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'public', 'content');
const outputFile = path.join(__dirname, 'public', 'postList.json');

const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

const postList = {
  posts: files.map(file => `${file.replace('.md', '')}`)  // Add 'content/' prefix here
};

fs.writeFileSync(outputFile, JSON.stringify(postList, null, 2));

console.log('postList.json generated successfully.');