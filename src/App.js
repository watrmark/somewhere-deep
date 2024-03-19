import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Posts from './Posts.js';
import Post from './Post.js';
import Guides from './Guides.js';
import Guide from './Guide.js';
import Symsyn from './Symsyn.js';
import SymsynItem from './SymsynItem.js';
import EntryPage from './EntryPage.js';
import './App.css';
import { fetchHomeContent } from './services/homeServices.js';
import { fetchPosts, fetchPostContent } from './services/postServices.js';
import { fetchGuides, fetchGuideContent } from './services/guidesServices.js';
import { fetchSymsynItems, fetchSymsynContent } from './services/symsynServices.js';

function App() {
  const [homeContent, setHomeContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [guides, setGuides] = useState([]);
  const [symsynItems, setSymsynItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = [
          { fetch: fetchHomeContent, set: setHomeContent },
          { fetch: fetchPosts, set: setPosts },
          { fetch: fetchGuides, set: setGuides },
          { fetch: fetchSymsynItems, set: setSymsynItems },
        ];

        const fetchPromises = services.map(async (service) => {
          const data = await service.fetch();
          service.set(data);
        });

        await Promise.all(fetchPromises);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/lurk" element={<Home content={homeContent} />} />
          <Route path="/posts" element={<Posts posts={posts} />} />
          <Route path="/posts/:slug" element={<Post fetchPostContent={fetchPostContent} />} />
          <Route path="/guides" element={<Guides guides={guides} />} />
          <Route path="/guides/:slug" element={<Guide fetchGuideContent={fetchGuideContent} />} />
          <Route path="/symsyn" element={<Symsyn items={symsynItems} />} />
          <Route path="/symsyn/:slug" element={<SymsynItem fetchSymsynContent={fetchSymsynContent} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;