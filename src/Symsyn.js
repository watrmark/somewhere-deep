import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';

const Symsyn = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-4">Symsyn</h1>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search symsyn items by title"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.slug} className="col-md-8 mb-4">
                <Link to={`/symsyn/${item.slug}`} className="card-link symsyn-card">
                  <div className="card">
                    {item.thumbnailUrl && (
                      <img src={item.thumbnailUrl} className="card-img-top" alt={item.title} />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.summary}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">No symsyn items found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Symsyn;