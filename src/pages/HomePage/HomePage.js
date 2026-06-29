// src/pages/HomePage/HomePage.js
import React from 'react';
import SEO from '../../components/SEO/SEO';
import IntroSection from './InfoSection/IntroSection';
import ProblemsSection from './ProblemsSection/ProblemsSection';
import SolutionsSection from './SolutionsSection/SolutionsSection';
import StatsSection from './StatsSection/StatsSection';
import ProcessSection from './ProcessSection/ProcessSection';
import ExecutionSection from './ExecutionSection/ExecutionSection';
import FeaturedProjects from './FeaturedProjects/FeaturedProjects';
import TestimonialsSection from './TestimonialsSection/TestimonialsSection';
import FAQSection from './FAQSection/FAQSection';
import ContactSection from './ContactSection/ContactSection';
import '../../assets/styles/responsive.css';

const HomePage = () => {
  // Schema.org structured data para SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PyScript.tech",
    "description": "Software House especializada em Automação, Inteligência Artificial e Sistemas Corporativos sob medida para empresas.",
    "url": "https://pyscript.tech",
    "logo": "https://pyscript.tech/images/Leo-Perfil.png",
    "foundingDate": "2019",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-21-98029-2791",
      "contactType": "Sales",
      "email": "contato@pyscript.tech",
      "availableLanguage": ["pt-BR", "en"]
    },
    "sameAs": [
      "https://github.com/LeonardoRFragoso",
      "https://linkedin.com/company/pyscripttech"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "70"
    },
    "knowsAbout": [
      "Automação de Processos",
      "Inteligência Artificial",
      "Sistemas Corporativos",
      "Integração de Sistemas",
      "Desenvolvimento Python",
      "Software sob Medida"
    ]
  };

  return (
    <>
      <SEO
        title="PyScript.tech - Automação, IA e Sistemas Corporativos para Empresas"
        description="Automação, Inteligência Artificial e Sistemas Corporativos sob medida. Transformamos processos manuais em operações inteligentes. Solicite um diagnóstico gratuito."
        url="https://pyscript.tech"
        keywords="software sob medida, desenvolvimento python, automação empresarial, inteligência artificial para empresas, integração de sistemas, software corporativo, RAG, chatbots, ERP, CRM"
      />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "PyScript.tech",
          "description": "Software House especializada em Automação, IA e Sistemas Corporativos.",
          "url": "https://pyscript.tech",
          "telephone": "+55-21-98029-2791",
          "email": "contato@pyscript.tech",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rio de Janeiro",
            "addressRegion": "RJ",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-22.9068",
            "longitude": "-43.1729"
          },
          "priceRange": "R$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Automação, IA e Sistemas Corporativos",
          "provider": {
            "@type": "Organization",
            "name": "PyScript.tech",
            "url": "https://pyscript.tech"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Brasil"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços PyScript.tech",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Automação Empresarial"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Inteligência Artificial Corporativa"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Sistemas Corporativos Sob Medida"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Integração de Sistemas"
                }
              }
            ]
          }
        })}
      </script>

      <div className="homepage-container">
        <IntroSection />
        <ProblemsSection />
        <SolutionsSection />
        <StatsSection />
        <ProcessSection />
        <ExecutionSection />
        <FeaturedProjects />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
