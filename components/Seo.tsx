import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
}

const Seo: React.FC<SeoProps> = ({ title, description }) => {
  useEffect(() => {
    const fullTitle = `${title} | ApolloPlug.com`;
    if (document.title !== fullTitle) {
      document.title = fullTitle;
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    if (metaDescription.getAttribute('content') !== description) {
        metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};

export default Seo;
