import services from "./index.js";

const {api, baseURL} = services;

export const fetchHomeContent = async () => {
  try {
    const response = await api.get(`/api/navbarRoutes/homeRoutes`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching home content:', error);
    throw error;
  }
};