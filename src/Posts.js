import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Posts = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-4">Posts</h1>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search posts by title"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.slug} className="col-md-8 mb-4">
                <Link to={`/posts/${post.slug}`} state={{ post }} className="card-link post-card">
                  <div className="card">
                    {post.thumbnailUrl && (
                      <img src={post.thumbnailUrl} className="card-img-top" alt={post.title} />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.summary}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">No posts found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;