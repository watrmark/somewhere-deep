import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import Post from './Post';
import Guides from './Guides';
import Symsyn from './Symsyn';
import EntryPage from './EntryPage';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/posts');
      console.log('API response data:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/lurk" element={<Home />} />
          <Route path="/posts" element={<Posts posts={posts} />} />
          <Route path="/posts/:slug" element={<Post posts={posts} />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/symsyn" element={<Symsyn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;