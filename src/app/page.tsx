// pages/index.tsx or app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

// Sample blog posts data
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies that are shaping the future of web development...',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Technology',
    slug: 'future-of-web-development'
  },
  {
    id: '2',
    title: 'Building Better User Experiences',
    excerpt: 'A deep dive into UX principles and how they can transform your digital products...',
    date: '2024-01-10',
    readTime: '8 min read',
    category: 'Design',
    slug: 'building-better-user-experiences'
  },
  {
    id: '3',
    title: 'Personal Growth Through Writing',
    excerpt: 'How consistent writing has transformed my thinking and personal development journey...',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Personal',
    slug: 'personal-growth-through-writing'
  },
  {
    id: '4',
    title: 'The Art of Minimalist Design',
    excerpt: 'Understanding how less can be more when it comes to creating impactful designs...',
    date: '2023-12-28',
    readTime: '4 min read',
    category: 'Design',
    slug: 'art-of-minimalist-design'
  },
  {
    id: '5',
    title: 'Lessons from Remote Work',
    excerpt: 'Key insights and strategies I have learned from years of working remotely...',
    date: '2023-12-20',
    readTime: '7 min read',
    category: 'Lifestyle',
    slug: 'lessons-from-remote-work'
  },
  {
    id: '6',
    title: 'JavaScript Best Practices',
    excerpt: 'Essential coding practices that every JavaScript developer should know and follow...',
    date: '2023-12-15',
    readTime: '10 min read',
    category: 'Technology',
    slug: 'javascript-best-practices'
  }
];

export default function HomePage(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'bg-blue-100 text-blue-800';
      case 'design':
        return 'bg-purple-100 text-purple-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      case 'lifestyle':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!mounted) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-black text-white p-2 rounded-lg">
                <span className="font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Bloggr</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/home" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Home
              </Link>
              <Link href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                About
              </Link>
              <Link href="/home" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Posts
              </Link>
              <Link href="/#contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Contact
              </Link>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-600 hover:text-gray-900"
              type="button"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              <Link href="/home" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link href="/home" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                Posts
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Welcome to My
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Digital Space</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Where thoughts meet words, and ideas come to life. Join me on a journey of discovery, learning, and meaningful conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#posts"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore My Posts
            </a>
            <a
              href="#about"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Learn About Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate writer, curious thinker, and storyteller sharing insights from my journey
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Hello, I am a Digital Storyteller
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Welcome to my corner of the internet! I&apos;m passionate about exploring ideas, sharing experiences, and connecting with readers through meaningful content. My writing spans technology, design, personal growth, and everything in between.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Every post is crafted with care, aiming to inform, inspire, or simply spark a thoughtful conversation. Whether you&apos;re here for technical insights or personal reflections, I hope you find something that resonates.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Writer</span>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Thinker</span>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">Creator</span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">Explorer</span>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-8xl">A</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section id="posts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Latest Posts</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover my recent thoughts, insights, and stories
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{formatDate(post.date)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Read More</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <span>View All Posts</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to get notified about new posts and updates
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Let&apos; Connect</h2>
          <p className="text-xl text-gray-600 mb-12">
            Have questions or want to collaborate? I&apos;d love to hear from you
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">hello@bloggr.com</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Social</h3>
              <p className="text-gray-600">@bloggr</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-white text-black p-2 rounded-lg">
                <span className="font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold">Bloggr</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                Made with passion for sharing stories
              </p>
              <p className="text-gray-500 text-sm">
                © 2024 Bloggr. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}