import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadRoutes() {
  const routes = {};

  // Read all the subfolders in the routes directory
  const folders = fs.readdirSync(__dirname).filter((folder) => {
    return fs.statSync(path.join(__dirname, folder)).isDirectory();
  });

  // Dynamically import and export the route files from each subfolder
  for (const folder of folders) {
    const routeFiles = fs.readdirSync(path.join(__dirname, folder)).filter((file) => {
      return file.endsWith('.js');
    });

    routes[folder] = {};

    for (const file of routeFiles) {
      const routeName = file.replace('.js', '');
      // Note that we are now awaiting the import
      const routeModule = await import(path.join(__dirname, folder, file));
      routes[folder][routeName] = routeModule.default; // Access default export
    }
  }

  return routes;
}

export default loadRoutes;