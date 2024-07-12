import services from "./index.js";

const { api } = services;

export const fetchPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const fetchPostContent = async (slug) => {
    try {
        const response = await api.get(`/api/posts/${slug}`);
        return response.data.content;
    } catch (error) {
        console.error(`Error fetching post content for slug ${slug}:`, error);
        throw error;
    }
};