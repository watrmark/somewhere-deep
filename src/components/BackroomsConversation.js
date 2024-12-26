// src/components/BackroomsConversation.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BackroomsConversation = () => {
  const [content, setContent] = useState('');
  const { dyad, slug } = useParams();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/content/backrooms/${dyad}/${slug}.md`);
        if (!res.ok) {
          throw new Error(`Failed to fetch conversation`);
        }
        const text = await res.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching conversation:', error);
        setContent('Error loading conversation');
      }
    };

    fetchConversation();
  }, [dyad, slug]);

  return (
    <div className="backrooms-conversation">
      <h1>Lurking In: {slug}</h1>
      <div className="conversation-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BackroomsConversation;