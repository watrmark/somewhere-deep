import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_TITLE } from './site_config';

function EntryPage() {
  return (
    <div className="App">
      <div className="entry-content">
        <h1 className="entry-title">
          <Link to='/lurk'>{SITE_TITLE}</Link>
        </h1>
      </div>
    </div>
  );
}

export default EntryPage;
