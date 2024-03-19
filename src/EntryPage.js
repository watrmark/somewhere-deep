import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_TITLE } from './site_config.js';

function EntryPage() {
  return (
      <div className="entry-content">
        <h1>
          <Link className='entry-title' to='/lurk'>{SITE_TITLE}</Link>
        </h1>
      </div>
  );
}

export default EntryPage;
