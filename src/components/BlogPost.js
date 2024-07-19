import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const BlogPost = ({ slug, title, date, excerpt, thumbnail }) => {
  return (
    <Link to={`/posts/${slug}`} className="blog-post-summary">
      <div className="blog-thumbnail-container">
        {thumbnail && <img src={`/${thumbnail}`} alt={title} className="blog-thumbnail" />}
      </div>
      <article className="blog-post-content">
        <div className="blog-post-info">
          <h2>{title}</h2>
          {date && <span className="date">{date}</span>}
        </div>
        {excerpt && <p className="excerpt">{excerpt}</p>}
      </article>
    </Link>
  );
};

BlogPost.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default BlogPost;