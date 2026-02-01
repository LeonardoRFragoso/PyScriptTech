import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaUser, FaArrowRight, FaSearch } from 'react-icons/fa';
import SEO from '../../components/SEO/SEO';
import ReadingProgress from '../../components/common/ReadingProgress';
import { SkeletonCard } from '../../components/common/SkeletonLoader';
import TiltCard from '../../components/common/TiltCard';
import './BlogPage.css';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'tutorials', label: 'Tutoriais' },
    { id: 'trends', label: 'Tendências' },
    { id: 'cases', label: 'Cases' },
    { id: 'business', label: 'Negócios' },
    { id: 'career', label: 'Carreira' },
  ];

  const posts = [
    {
      id: 1,
      title: 'Como Escolher a Stack Tecnológica Ideal para Seu Projeto',
      excerpt: 'Guia completo para tomar a decisão mais importante do seu projeto: escolher as tecnologias certas que vão determinar o sucesso do desenvolvimento.',
      category: 'tutorials',
      author: 'Leonardo Fragoso',
      date: '2024-01-15',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      featured: true,
      tags: ['Python', 'React', 'Arquitetura', 'Boas Práticas'],
    },
    {
      id: 2,
      title: '10 Tendências de Desenvolvimento Web para 2024',
      excerpt: 'Descubra as principais tendências que estão moldando o futuro do desenvolvimento web e como sua empresa pode se beneficiar delas.',
      category: 'trends',
      author: 'Leonardo Fragoso',
      date: '2024-01-10',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
      featured: true,
      tags: ['Web Development', 'Tendências', 'IA', 'Next.js'],
    },
    {
      id: 3,
      title: 'Case de Sucesso: Como Automatizamos 70% dos Processos de um E-commerce',
      excerpt: 'Conheça a história de como transformamos um e-commerce tradicional em uma operação 100% automatizada, economizando milhares de reais mensais.',
      category: 'cases',
      author: 'Leonardo Fragoso',
      date: '2024-01-05',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      featured: true,
      tags: ['Automação', 'E-commerce', 'Case', 'ROI'],
    },
    {
      id: 4,
      title: 'Python vs Node.js: Qual Escolher para o Backend?',
      excerpt: 'Análise detalhada das duas tecnologias mais populares para desenvolvimento backend, com prós, contras e casos de uso ideais.',
      category: 'tutorials',
      author: 'Leonardo Fragoso',
      date: '2024-01-01',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop',
      featured: false,
      tags: ['Python', 'Node.js', 'Backend', 'Comparação'],
    },
    {
      id: 5,
      title: 'Como Transformar sua Ideia em Software Lucrativo',
      excerpt: 'Passo a passo completo desde a validação da ideia até o lançamento do MVP e as primeiras vendas.',
      category: 'business',
      author: 'Leonardo Fragoso',
      date: '2023-12-28',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      featured: false,
      tags: ['MVP', 'Startup', 'Produto', 'Negócios'],
    },
    {
      id: 6,
      title: 'Carreira em Tech: Como se Tornar um Desenvolvedor Full Stack',
      excerpt: 'Roadmap completo com as habilidades, tecnologias e práticas necessárias para se tornar um desenvolvedor full stack de sucesso.',
      category: 'career',
      author: 'Leonardo Fragoso',
      date: '2023-12-20',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      featured: false,
      tags: ['Carreira', 'Full Stack', 'Roadmap', 'Aprendizado'],
    },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="blogPage">
      <ReadingProgress color="#00d4ff" />
      <SEO
        title="Blog - Artigos sobre Tecnologia e Desenvolvimento"
        description="Artigos, tutoriais e insights sobre desenvolvimento de software, tendências tecnológicas, cases de sucesso e carreira em tech."
        url="https://pyscript.tech/blog"
      />

      {/* Hero Section */}
      <section className="blogHero">
        <motion.div
          className="heroContent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="heroBadge">Blog</span>
          <h1>
            Insights sobre
            <span>Tecnologia e Inovação</span>
          </h1>
          <p>
            Artigos, tutoriais e cases de sucesso para ajudar você a tomar 
            decisões mais inteligentes sobre tecnologia.
          </p>

          {/* Search Bar */}
          <div className="searchBar">
            <FaSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Filter */}
      <section className="categoriesSection">
        <div className="categoriesWrapper">
          {categories.map(category => (
            <button
              key={category.id}
              className={`categoryButton ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === 'all' && !searchTerm && (
        <section className="featuredSection">
          <div className="sectionHeader">
            <span className="sectionBadge">Em Destaque</span>
            <h2>Artigos Populares</h2>
          </div>
          <div className="featuredGrid">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="featuredPost"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="postImage">
                  <img src={post.image} alt={post.title} />
                  <span className="categoryLabel">{categories.find(c => c.id === post.category)?.label}</span>
                </div>
                <div className="postContent">
                  <div className="postMeta">
                    <span className="metaItem">
                      <FaCalendar />
                      {new Date(post.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="metaItem">
                      <FaClock />
                      {post.readTime}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="postTags">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="postFooter">
                    <div className="authorInfo">
                      <FaUser className="authorIcon" />
                      <span>{post.author}</span>
                    </div>
                    <a href={`/blog/${post.id}`} className="readMore">
                      Ler mais
                      <FaArrowRight />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="allPostsSection">
        <div className="sectionHeader">
          <h2>
            {activeCategory === 'all' ? 'Todos os Artigos' : categories.find(c => c.id === activeCategory)?.label}
          </h2>
          <p>{filteredPosts.length} artigos encontrados</p>
        </div>
        <div className="postsGrid">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="postCard"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="cardImage">
                <img src={post.image} alt={post.title} />
                <span className="categoryLabel">{categories.find(c => c.id === post.category)?.label}</span>
              </div>
              <div className="cardContent">
                <div className="postMeta">
                  <span className="metaItem">
                    <FaCalendar />
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="metaItem">
                    <FaClock />
                    {post.readTime}
                  </span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="postTags">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <a href={`/blog/${post.id}`} className="readMore">
                  Continuar lendo
                  <FaArrowRight />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletterSection">
        <motion.div
          className="newsletterContent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Receba Conteúdo Exclusivo</h2>
          <p>
            Assine nossa newsletter e receba artigos, tutoriais e dicas diretamente no seu email.
          </p>
          <form className="newsletterForm">
            <input
              type="email"
              placeholder="Seu melhor email"
              required
            />
            <button type="submit">
              Assinar Grátis
              <FaArrowRight />
            </button>
          </form>
          <span className="newsletterNote">
            Sem spam. Cancele a qualquer momento.
          </span>
        </motion.div>
      </section>
    </div>
  );
};

export default BlogPage;
