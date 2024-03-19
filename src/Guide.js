import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar.js';
import './App.css';

const Guide = ({ fetchGuideContent }) => {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const content = await fetchGuideContent(slug);
        setGuide(content);
      } catch (error) {
        console.error('Error fetching guide:', error);
      }
    };

    fetchGuide();
  }, [fetchGuideContent, slug]);

  if (!guide) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1 className="text-center mb-4">{guide.title}</h1>
            <div className="guide-content">
              <ReactMarkdown>{guide.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;