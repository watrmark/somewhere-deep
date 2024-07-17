const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'public', 'content');
const outputFile = path.join(__dirname, 'public', 'postlist.json');

const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

const postList = {
  posts: files
};

fs.writeFileSync(outputFile, JSON.stringify(postList, null, 2));

console.log('postlist.json generated successfully.');