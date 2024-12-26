// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1 id="glitch-title">s̶̢̼̭̓͝o̸̭͆̈̊m̴̩̜͚̌ĕ̸̠̫̉w̵̪̲̃̀ĥ̷̲̫́ĕ̸̢͓͖r̸̤̖̊e̵̥̎ ̷̙̘̮̽̇d̷̺̽ȅ̷̩͎͙̀̉e̶̦̰̾̾̈́p̷͕̹͐͘</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/browsing">Posts</Link>
        <Link to="/lurking">Backrooms</Link>
      </nav>
    </header>
  );
};

export default Header;