import React, { useEffect } from 'react';
import type { SeoData } from '../types';

const Seo: React.FC<SeoData> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
}) => {
  useEffect(() => {
    const fullTitle = `${title} | ApolloPlug.com`;
    if (document.title !== fullTitle) {
      document.title = fullTitle;
    }

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      const selector = `meta[${attr}="${key}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) setMeta('name', 'description', description);
    
    // Open Graph Tags
    setMeta('property', 'og:title', ogTitle || title);
    setMeta('property', 'og:description', ogDescription || description);
    if (ogImage) setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', window.location.href);
    setMeta('property', 'og:site_name', 'ApolloPlug.com');

  }, [title, description, ogTitle, ogDescription, ogImage, ogType]);

  return null;
};

export default Seo;