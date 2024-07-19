import matter from 'gray-matter';

const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../posts', false, /\.md$/))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getAllPosts = () => {
  return markdownFiles.map(file => {
    const { data, content } = matter(file.default);
    return {
      ...data,
      content
    };
  });
};

export const getPostBySlug = (slug) => {
  const post = markdownFiles.find(file => file.slug === slug);
  if (!post) return null;
  const { data, content } = matter(post.default);
  return {
    ...data,
    content
  };
};