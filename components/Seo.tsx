import React, { useEffect } from 'react';
import type { SeoData } from '../types';
import { SITE_DOMAIN } from '../configs/site';

const Seo: React.FC<SeoData> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  robots,
}) => {
  useEffect(() => {
    if (document.title !== title) {
      document.title = title;
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
    setMeta('property', 'og:site_name', SITE_DOMAIN);

    if (robots) setMeta('name', 'robots', robots);

    return () => {
      if (!robots) return;
      const el = document.querySelector('meta[name="robots"]');
      if (el?.getAttribute('content') === robots) {
        el.setAttribute('content', 'index, follow');
      }
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogType, robots]);

  return null;
};

export default Seo;