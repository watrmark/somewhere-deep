import React from 'react';
import Navbar from './Navbar.js';
import ReactMarkdown from 'react-markdown';

const Home = ({ content }) => {
  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;