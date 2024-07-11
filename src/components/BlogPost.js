import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ slug, title, date, excerpt, thumbnail }) => {
  return (
    <Link to={`/post/${slug}`} className="blog-post-summary">
      <div className="blog-thumbnail-container">
        <img src={thumbnail} alt={title} className="blog-thumbnail" />
      </div>
      <article className="blog-post-content">
        <div className="blog-post-info">
          <h2>{title}</h2>
          <span className="date">{date}</span>
        </div>
        <p className="excerpt">{excerpt}</p>
      </article>
    </Link>
  );
};

export default BlogPost;