import services from "./index.js";
const {api, baseURL} = services;

export const fetchGuides = async () => {
  try {
    const response = await api.get(`/api/navbarRoutes/guidesRoutes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guides:', error);
    throw error;
  }
};

export const fetchGuideContent = async (slug) => {
  try {
    const response = await api.get(`/api/navbarRoutes/guidesRoutes/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching guide content for slug ${slug}:`, error);
    throw error;
  }
};