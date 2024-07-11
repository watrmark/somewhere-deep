import app from './server.mjs';

const port = process.env.PORT || 5001;

console.log('Starting server...');

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Available routes:');
  app._router.stack.forEach(r => {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
});