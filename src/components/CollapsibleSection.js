// src/components/CollapsibleSection.js
import React, { useState, useRef, useEffect } from 'react';

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(defaultOpen ? 'auto' : '0px');
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="collapsible-section">
      <h3 onClick={toggleSection} className="collapsible-title">
        {title} <span className={`arrow ${isOpen ? 'arrow-down' : ''}`}></span>
      </h3>
      <div 
        className="section-content" 
        ref={contentRef}
        style={{ height, overflow: 'hidden', transition: 'height 0.3s ease-out' }}
      >
        <div>{children}</div>
      </div>
    </section>
  );
};

export default CollapsibleSection;