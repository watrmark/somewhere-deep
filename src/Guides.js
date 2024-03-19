import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';

const Guides = ({ guides }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGuides = guides.filter((guide) => 
    guide.title && guide.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-4">Guides</h1>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search guides by title"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => (
                
              <div key={guide.slug} className="col-md-8 mb-4">
                {console.log(guide)}
                <Link to={`/guides/${guide.slug}`} className="card-link guide-card">
                  <div className="card">
                    {guide.thumbnailUrl && (
                      <img src={guide.thumbnailUrl} className="card-img-top" alt={guide.title} />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{guide.title}</h5>
                      <p className="card-text">{guide.summary}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">No guides found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guides;