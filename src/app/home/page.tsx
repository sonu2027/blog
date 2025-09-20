// pages/index.js or app/page.js (depending on your Next.js version)
'use client';

import { useState } from 'react';
// import Image from 'next/image';
import Link from 'next/link';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Everyday Life",
    excerpt: "Explore how artificial intelligence is transforming our daily routines, from smart homes to personalized healthcare.",
    category: "Technology",
    image: "/api/placeholder/400/200",
    date: "Oct 26, 2023",
    readTime: "4 min read",
    bgColor: "bg-green-200"
  },
  {
    id: 2,
    title: "Discovering Hidden Gems in the Pacific Northwest",
    excerpt: "Journey through the breathtaking and charming towns of the Pacific Northwest, perfect for your next adventure.",
    category: "Travel",
    image: "/api/placeholder/400/200",
    date: "Oct 25, 2023",
    readTime: "6 min read",
    bgColor: "bg-blue-100"
  },
  {
    id: 3,
    title: "Mastering the Art of Sourdough Baking",
    excerpt: "Learn the secrets to creating the perfect sourdough loaf, from starter maintenance to baking techniques.",
    category: "Food",
    image: "/api/placeholder/400/200",
    date: "Oct 24, 2023",
    readTime: "10 min read",
    bgColor: "bg-yellow-100"
  },
  {
    id: 4,
    title: "The Rise of Quantum Computing",
    excerpt: "Delve into the world of quantum computing and its potential to revolutionize industries like cryptography and drug discovery.",
    category: "Technology",
    image: "/api/placeholder/400/200",
    date: "Oct 23, 2023",
    readTime: "12 min read",
    bgColor: "bg-gray-800"
  },
  {
    id: 5,
    title: "Exploring the Ancient Ruins of Machu Picchu",
    excerpt: "Journey through the mystical ruins of Machu Picchu, uncovering the history and culture of this iconic Incan citadel.",
    category: "Travel",
    image: "/api/placeholder/400/200",
    date: "Oct 22, 2023",
    readTime: "9 min read",
    bgColor: "bg-emerald-200"
  },
  {
    id: 6,
    title: "The Ultimate Guide to Vegan Cuisine",
    excerpt: "Discover the vibrant and diverse world of vegan cooking, with recipes and tips for creating delicious plant-based meals.",
    category: "Food",
    image: "/api/placeholder/400/200",
    date: "Oct 21, 2023",
    readTime: "7 min read",
    bgColor: "bg-green-700"
  }
];

const categories = ["Technology", "Travel", "Food", "Health", "Lifestyle"];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === '' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-black text-white p-2 rounded-lg">
                <span className="font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Bloggr</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium">
                Blog
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Link href="/create-post">
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  + Create Post
                </button>
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">A</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search blogs by title, author or content..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-600 font-medium">Filter by category:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === ''
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              {/* Image */}
              <div className={`h-48 ${post.bgColor} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {post.category === 'Technology' && post.id === 1 && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🤖</div>
                      <div className="text-lg font-semibold">AI</div>
                      <div className="text-sm opacity-80">FUTURE</div>
                    </div>
                  )}
                  {post.category === 'Travel' && post.id === 2 && (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🏔️</div>
                      <div className="text-lg font-semibold">PACIFIC NW</div>
                    </div>
                  )}
                  {post.category === 'Food' && post.id === 3 && (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-32 h-32 bg-amber-800 rounded-full flex items-center justify-center">
                        <div className="text-amber-100 text-6xl">🍞</div>
                      </div>
                    </div>
                  )}
                  {post.category === 'Technology' && post.id === 4 && (
                    <div className="text-center">
                      <div className="text-orange-400 text-4xl mb-2">⚡</div>
                      <div className="text-white text-lg font-semibold">QUANTUM</div>
                    </div>
                  )}
                  {post.category === 'Travel' && post.id === 5 && (
                    <div className="text-center">
                      <div className="text-6xl mb-2">🏛️</div>
                      <div className="text-gray-800 text-lg font-semibold">MACHU PICCHU</div>
                    </div>
                  )}
                  {post.category === 'Food' && post.id === 6 && (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🥗</div>
                      <div className="text-white text-lg font-semibold">VEGAN</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="text-sm text-gray-500 font-medium mb-2">
                  {post.category}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter to find what you are looking for.</p>
          </div>
        )}
      </main>
    </div>
  );
}