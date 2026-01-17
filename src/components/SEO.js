import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { metaConfig, getFullUrl, getCanonicalUrl } from '../config/metaConfig';

function SEO({ pageKey, title, description, keywords, image, noindex = false }) {
  const location = useLocation();
  const defaultMeta = metaConfig.default;
  const pageMeta = metaConfig[pageKey] || {};

  // Use provided values or fall back to page config or defaults
  const seoTitle = title || pageMeta.title || defaultMeta.title;
  const seoDescription = description || pageMeta.description || defaultMeta.description;
  const seoKeywords = keywords || pageMeta.keywords || defaultMeta.keywords;
  const seoImage = image || pageMeta.ogImage || defaultMeta.ogImage;
  const seoPath = pageMeta.path || location.pathname;
  const shouldIndex = noindex !== undefined ? !noindex : !pageMeta.noindex;

  const fullUrl = getFullUrl(seoPath);
  const canonicalUrl = getCanonicalUrl(location.pathname);
  const imageUrl = seoImage.startsWith('http') ? seoImage : getFullUrl(seoImage);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {!shouldIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={imageUrl} />
    </Helmet>
  );
}

export default SEO;

