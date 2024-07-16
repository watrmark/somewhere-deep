import { fetchPosts } from './postServices';

export const fetchFeaturedPosts = async () => {
  try {
    const posts = await fetchPosts();
    return posts.filter(post => 
      post.content.includes('featured: true') || post.content.includes('featured: yes')
    );
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    throw error;
  }
};