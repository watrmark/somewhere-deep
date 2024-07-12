import services from "./index.js";

const { api } = services;

export const fetchFeaturedPosts = async () => {
  try {
    const response = await api.get('/featured-posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    throw error;
  }
};