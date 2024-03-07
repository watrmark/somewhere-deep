import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';
import './App.css';

const Post = () => {
  const location = useLocation();
  const post = location.state?.post;

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1 className="text-center mb-4">{post.title}</h1>
            <div className="post-content">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;