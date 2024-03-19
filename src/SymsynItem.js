import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar.js';
import './App.css';

const SymsynItem = ({ fetchSymsynContent }) => {
  const { slug } = useParams();
  const [symsynItem, setSymsynItem] = useState(null);

  useEffect(() => {
    const fetchSymsynItem = async () => {
      try {
        const content = await fetchSymsynContent(slug);
        setSymsynItem(content);
      } catch (error) {
        console.error('Error fetching symsyn item:', error);
      }
    };

    fetchSymsynItem();
  }, [fetchSymsynContent, slug]);

  if (!symsynItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1 className="text-center mb-4">{symsynItem.title}</h1>
            <div className="symsyn-item-content">
              <ReactMarkdown>{symsynItem.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymsynItem;