const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'public', 'posts');
const outputFile = path.join(__dirname, 'public', 'postList.json');

const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

const postList = {
  posts: files
};

fs.writeFileSync(outputFile, JSON.stringify(postList, null, 2));

console.log('postList.json generated successfully.');