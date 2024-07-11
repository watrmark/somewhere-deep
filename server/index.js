import app from './server.mjs';

console.log('Starting server from index.js...');

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});