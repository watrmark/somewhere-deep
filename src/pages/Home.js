// src/pages/Home.js
import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection.js';
import About from '../components/About.js';
import Series from '../components/Series.js';
import FeaturedPosts from '../components/FeaturedPosts.js';

const Home = () => {
  return (
    <main className="container">
      <CollapsibleSection title="About" defaultOpen={true}>
        <About />
      </CollapsibleSection>
      <CollapsibleSection title="Series">
        <Series />
      </CollapsibleSection>
      <CollapsibleSection title="Featured Posts">
        <FeaturedPosts />
      </CollapsibleSection>
    </main>
  );
};

export default Home;