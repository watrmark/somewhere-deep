import app from './server.mjs';

console.log('Starting server...');

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log('After app.listen call');