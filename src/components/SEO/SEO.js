import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'PyScript.tech - Automação, IA e Sistemas Corporativos',
  description = 'Automação, Inteligência Artificial e Sistemas Corporativos sob medida para empresas que querem crescer com menos esforço operacional.',
  keywords = 'software sob medida, desenvolvimento python, automação empresarial, inteligência artificial para empresas, integração de sistemas, software corporativo, RAG, chatbots, ERP, CRM',
  author = 'PyScript.tech',
  image = '/og-image.png',
  url = 'https://pyscript.tech',
  type = 'website',
  breadcrumbs = [],
}) => {
  const siteTitle = title.includes('PyScript.tech') ? title : `${title} | PyScript.tech`;

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="PyScript.tech" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={url} />

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
