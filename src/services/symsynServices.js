import services from "./index.js";

const {api, baseURL} = services;

export const fetchSymsynItems = async () => {
  try {
    const response = await api.get(`/api/navbarRoutes/symsynRoutes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching symsyn items:', error);
    throw error;
  }
};

export const fetchSymsynContent = async (slug) => {
  try {
    const response = await api.get(`/api/navbarRoutes/symsynRoutes/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching symsyn content for slug ${slug}:`, error);
    throw error;
  }
};