// pages/blog/[slug].tsx or app/blog/[slug]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Sample blog post data
const blogPost = {
    id: 1,
    title: "The Future of Sustainable Living",
    author: "Amir ul Asper",
    publishDate: "January 15, 2024",
    readTime: "8 min read",
    image: "/api/placeholder/800/400",
    content: `Sustainability is no longer a buzzword; it has become a core necessity. With climate change and environmental decline in an unprecedented pace, individuals, communities, and nations must work together to create a more sustainable future. This blog post explores the critical practices of sustainable living and how each of us can contribute to the global effort to preserve our planet for generations to come.

The concept of sustainable living encompasses various aspects - from the way we consume resources, manage waste and transportation across our living households, methods of food production, and the technologies we embrace in our daily lives. These all play significant roles in determining our environmental impact and the wellbeing of our planet.

Another critical aspect of sustainable living is renewable energy. From solar roofs to wind power installations and geothermal systems, renewable energy sources represent an opportunity for long-term environmental preservation. Moreover, these technologies are becoming increasingly accessible and cost-effective, revolutionizing how households and businesses around the world access electricity.

Sustainable living also involves conscious consuming, including choosing locally-sourced, fair-trade products and reducing waste. Every small action matters - from using reusable bags and containers to supporting environmentally-conscious brands. Additionally, embracing mindful practices such as minimalism can significantly reduce our environmental footprint while improving our quality of life and overall wellbeing.`,

    engagement: {
        likes: 142,
        shares: 28,
        bookmarks: 67
    },

    comments: [
        {
            id: 1,
            author: "Elena Carter",
            timeAgo: "2 days ago",
            content: "This post perfectly captures the essence of sustainable living and what we can do to create a more climate-aware lifestyle.",
            avatar: "EC"
        },
        {
            id: 2,
            author: "Sophia Bennett",
            timeAgo: "3 days ago",
            content: "Love the focus this piece brings to solar as an important aspect of green living.",
            avatar: "SB"
        },
        {
            id: 3,
            author: "Alex Parker",
            timeAgo: "4 days ago",
            content: "Thanks for creating thoughtful blog posts - keep them up - Alex 🙂",
            avatar: "AP"
        }
    ]
};

export default function BlogPostPage(): React.JSX.Element {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(blogPost.engagement.likes);
    const [newComment, setNewComment] = useState('');

    const handleLike = (): void => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleBookmark = (): void => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = (): void => {
        if (navigator.share) {
            navigator.share({
                title: blogPost.title,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleAddComment = (): void => {
        if (newComment.trim()) {
            // Add comment logic here
            console.log('New comment:', newComment);
            setNewComment('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="bg-black text-white p-2 rounded-lg">
                                    <span className="font-bold text-xl">B</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">Bloggr</span>
                            </Link>

                            <div className="hidden md:flex space-x-6">
                                <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                                    Home
                                </Link>
                                <Link href="/explore" className="text-gray-600 hover:text-gray-900 font-medium">
                                    Explore
                                </Link>
                                <Link href="/write" className="text-gray-600 hover:text-gray-900 font-medium">
                                    Write
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V12a4 4 0 00-8 0v5h5" />
                                </svg>
                            </button>
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">A</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article>
                    {/* Article Header */}
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {blogPost.title}
                        </h1>

                        <div className="flex items-center text-gray-600 text-sm space-x-4">
                            <span>By <span className="font-medium text-gray-900">{blogPost.author}</span></span>
                            <span>•</span>
                            <span>Published on {blogPost.publishDate}</span>
                            <span>•</span>
                            <span>{blogPost.readTime}</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="mb-8">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-green-200/30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Sustainable house illustration */}
                                <div className="bg-amber-900 w-80 h-48 rounded-lg relative shadow-2xl">
                                    {/* House structure */}
                                    <div className="absolute bottom-0 w-full h-32 bg-amber-800 rounded-b-lg"></div>

                                    {/* Roof */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-20 bg-gray-800 rounded-t-lg shadow-lg"></div>

                                    {/* Windows */}
                                    <div className="absolute bottom-12 left-8 w-12 h-16 bg-blue-200 rounded border-2 border-gray-700"></div>
                                    <div className="absolute bottom-12 right-8 w-12 h-16 bg-blue-200 rounded border-2 border-gray-700"></div>

                                    {/* Solar panels on roof */}
                                    <div className="absolute top-2 left-4 w-8 h-6 bg-blue-900 rounded"></div>
                                    <div className="absolute top-2 left-14 w-8 h-6 bg-blue-900 rounded"></div>
                                    <div className="absolute top-2 right-4 w-8 h-6 bg-blue-900 rounded"></div>
                                    <div className="absolute top-2 right-14 w-8 h-6 bg-blue-900 rounded"></div>

                                    {/* Trees */}
                                    <div className="absolute -left-12 bottom-0 w-8 h-24 bg-green-600 rounded-full"></div>
                                    <div className="absolute -right-12 bottom-0 w-8 h-24 bg-green-600 rounded-full"></div>
                                    <div className="absolute -left-20 bottom-0 w-6 h-20 bg-green-500 rounded-full"></div>
                                    <div className="absolute -right-20 bottom-0 w-6 h-20 bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none mb-8">
                        {blogPost.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Engagement Buttons */}
                    <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8">
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={handleLike}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isLiked ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="font-medium">{likeCount}</span>
                            </button>

                            <button
                                onClick={handleShare}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                <span className="font-medium">{blogPost.engagement.shares}</span>
                            </button>

                            <button
                                onClick={handleBookmark}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isBookmarked ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <span className="font-medium">{blogPost.engagement.bookmarks}</span>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">Comments</h3>

                        {/* Comment List */}
                        <div className="space-y-4">
                            {blogPost.comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">{comment.avatar}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-medium text-gray-900">{comment.author}</h4>
                                            <span className="text-gray-500 text-sm">{comment.timeAgo}</span>
                                        </div>
                                        <p className="text-gray-700">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">A</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        rows={3}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                    <div className="mt-3 flex justify-end">
                                        <button
                                            onClick={handleAddComment}
                                            disabled={!newComment.trim()}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Add Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}