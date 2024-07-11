import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import axios from 'axios';

function ContentEditor({ fileName }) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`/api/content/${fileName}`);
      setMarkdownContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleContentChange = (e) => {
    setMarkdownContent(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/content/${fileName}`, { content: markdownContent });
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <div>
      <textarea value={markdownContent} onChange={handleContentChange} />
      <button onClick={handleSave}>Save</button>
      <ReactMarkdown className="markdown-content" rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
    </div>
  );
}

export default ContentEditor;
