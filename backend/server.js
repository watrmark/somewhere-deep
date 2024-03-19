import loadRoutes from './routes/index.js';
import express from 'express';
import cors from 'cors';

async function startServer() {
  const app = express();
  const port = process.env.PORT || 5001;

  app.use(express.json());
  app.use(cors());

  // Await the dynamically imported routes
  const routes = await loadRoutes();

  // Loop through the subfolders and their routes
  Object.keys(routes).forEach((folderName) => {
    Object.keys(routes[folderName]).forEach((routeName) => {
      app.use(`/api/${folderName}/${routeName}`, routes[folderName][routeName]);
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer().catch(console.error);
