const fs = require('fs');
const path = require('path');

// Generate posts list
const postsDir = path.join(__dirname, 'public', 'content/posts');
const postsOutputFile = path.join(__dirname, 'public', 'postList.json');

const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
const postList = {
  posts: postFiles.map(file => `${file}`)
};

fs.writeFileSync(postsOutputFile, JSON.stringify(postList, null, 2));

// Generate backrooms list
const backroomsDir = path.join(__dirname, 'public', 'content/backrooms');
const backroomsOutputFile = path.join(__dirname, 'public', 'backroomsList.json');

const dyads = {};
fs.readdirSync(backroomsDir).forEach(dyad => {
  const dyadPath = path.join(backroomsDir, dyad);
  if (fs.statSync(dyadPath).isDirectory()) {
    const conversations = fs.readdirSync(dyadPath)
      .filter(file => file.endsWith('.md'));
    dyads[dyad] = conversations;
  }
});

const backroomsList = { dyads };
fs.writeFileSync(backroomsOutputFile, JSON.stringify(backroomsList, null, 2));

console.log('postList.json and backroomsList.json generated successfully.');