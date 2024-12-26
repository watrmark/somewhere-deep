// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Posts from './pages/Posts.js';
import Post from './components/Post.js';
import Backrooms from './pages/Backrooms.js';
import BackroomsConversation from './components/BackroomsConversation.js';
import Footer from './components/Footer.js';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browsing" element={<Posts />} />
                <Route path="/reading/:slug" element={<Post />} />
                <Route path="/lurking" element={<Backrooms />} />
                <Route path="/lurkingIn/:dyad/:slug" element={<BackroomsConversation />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;