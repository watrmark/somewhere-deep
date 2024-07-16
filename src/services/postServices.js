import services from './index.js';

const { api } = services;

export const fetchPosts = async () => {
  try {
    // Add a console.log to see the full URL being requested
    console.log('Fetching posts from:', `${services.API_URL}/posts`);
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostContent = async (slug) => {
  try {
    // Add a console.log here too
    console.log('Fetching post content from:', `${services.API_URL}/posts?slug=${slug}`);
    const response = await api.get(`/posts?slug=${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post content for slug ${slug}:`, error);
    throw error;
  }
};
