// pages/create-post.tsx or app/create-post/page.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// JSX namespace declaration
// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             [elemName: string]: any;
//         }
//     }
// }

// Type definitions
interface ElementType {
    id: string;
    type: 'h1' | 'h2' | 'p' | 'img' | 'a' | 'blockquote' | 'ul';
    name: string;
    icon: string;
    defaultContent: string | string[];
    className: string;
    href?: string;
}

interface DroppedElement extends ElementType {
    content: string | string[];
}

// Available elements that can be dragged
const ELEMENTS: ElementType[] = [
    {
        id: 'headline1',
        type: 'h1',
        name: 'Headline 1',
        icon: '📝',
        defaultContent: 'Your Headline Here',
        className: 'text-4xl font-bold text-gray-900 mb-4'
    },
    {
        id: 'headline2',
        type: 'h2',
        name: 'Headline 2',
        icon: '📝',
        defaultContent: 'Your Subheading Here',
        className: 'text-2xl font-semibold text-gray-800 mb-3'
    },
    {
        id: 'paragraph',
        type: 'p',
        name: 'Paragraph',
        icon: '📄',
        defaultContent: 'Write your content here. Click to edit this text.',
        className: 'text-gray-700 leading-relaxed mb-4'
    },
    {
        id: 'image',
        type: 'img',
        name: 'Image',
        icon: '🖼️',
        defaultContent: 'https://via.placeholder.com/600x300/e5e7eb/9ca3af?text=Drag+Image+Here',
        className: 'w-full max-w-2xl mx-auto rounded-lg shadow-sm mb-4'
    },
    {
        id: 'link',
        type: 'a',
        name: 'Link',
        icon: '🔗',
        defaultContent: 'Click here',
        href: 'https://example.com',
        className: 'text-blue-600 hover:text-blue-800 underline'
    },
    {
        id: 'quote',
        type: 'blockquote',
        name: 'Quote',
        icon: '💬',
        defaultContent: 'This is an inspiring quote that adds value to your content.',
        className: 'border-l-4 border-blue-500 pl-4 italic text-gray-600 bg-gray-50 py-3 mb-4'
    },
    {
        id: 'list',
        type: 'ul',
        name: 'List',
        icon: '📋',
        defaultContent: ['First item', 'Second item', 'Third item'],
        className: 'list-disc list-inside text-gray-700 mb-4 space-y-1'
    }
];

export default function CreatePostPage(): React.JSX.Element {
    const [postTitle, setPostTitle] = useState<string>('');
    const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);
    const [draggedElement, setDraggedElement] = useState<ElementType | null>(null);
    const [editingElement, setEditingElement] = useState<string | null>(null);
    // const [editingLink, setEditingLink] = useState<string | null>(null);
    const [linkEditMode, setLinkEditMode] = useState<{ [key: string]: boolean }>({});
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const dragCounter = useRef<number>(0);
    // const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle drag start
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: ElementType): void => {
        setDraggedElement(element);
        e.dataTransfer.effectAllowed = 'copy';
    };

    // Handle drag over
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    // Handle drag enter
    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        dragCounter.current++;
        if (dropZoneRef.current) {
            dropZoneRef.current.classList.add('border-blue-400', 'bg-blue-50');
        }
    }, []);

    // Handle drag leave
    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        dragCounter.current--;
        if (dragCounter.current === 0 && dropZoneRef.current) {
            dropZoneRef.current.classList.remove('border-blue-400', 'bg-blue-50');
        }
    }, []);

    // Handle drop
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        dragCounter.current = 0;

        if (dropZoneRef.current) {
            dropZoneRef.current.classList.remove('border-blue-400', 'bg-blue-50');
        }

        if (draggedElement) {
            const newElement: DroppedElement = {
                ...draggedElement,
                id: `${draggedElement.id}_${Date.now()}`,
                content: draggedElement.defaultContent
            };

            setDroppedElements((prev: DroppedElement[]) => [...prev, newElement]);
            setDraggedElement(null);

            // Set link to edit mode when first dropped
            if (newElement.type === 'a') {
                setLinkEditMode(prevMode => ({
                    ...prevMode,
                    [newElement.id]: true
                }));
            }
        }
    }, [draggedElement]);

    // Handle element edit
    const handleElementEdit = (elementId: string, newContent: string | string[], href?: string): void => {
        setDroppedElements((prev: DroppedElement[]) =>
            prev.map((el: DroppedElement) =>
                el.id === elementId ? { ...el, content: newContent, ...(href && { href }) } : el
            )
        );
    };

    // Handle element delete
    const handleElementDelete = (elementId: string): void => {
        setDroppedElements((prev: DroppedElement[]) =>
            prev.filter((el: DroppedElement) => el.id !== elementId)
        );
        // Clean up link edit mode state
        setLinkEditMode(prevMode => {
            const newMode = { ...prevMode };
            delete newMode[elementId];
            return newMode;
        });
    };

    // Handle link save/edit toggle
    const handleLinkSaveEdit = (elementId: string): void => {
        setLinkEditMode(prevMode => ({
            ...prevMode,
            [elementId]: !prevMode[elementId]
        }));
    };

    // Handle file upload for images
    const handleFileUpload = (elementId: string, file: File): void => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                handleElementEdit(elementId, e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    // Handle image click to open file dialog
    const handleImageClick = (elementId: string): void => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                handleFileUpload(elementId, file);
            }
        };
        fileInput.click();
    };

    // Handle publish
    const handlePublish = (): void => {
        const postData = {
            title: postTitle,
            elements: droppedElements
        };
        console.log('Publishing post:', postData);
        // Add your publish logic here
    };

    // Render dropped element
    const renderElement = (element: DroppedElement): React.JSX.Element => {
        const { type, content, className, href } = element;

        const commonProps = {
            className: `${className} relative group cursor-pointer border-2 border-transparent hover:border-gray-300 rounded p-2`,
            onClick: () => {
                if (type === 'img') {
                    handleImageClick(element.id);
                } else if (type === 'a') {
                    // Don't set editing state for links, they have their own edit mode
                    return;
                } else {
                    setEditingElement(element.id);
                }
            },
            key: element.id
        };

        const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
            if (e.key === 'Enter') {
                setEditingElement(null);
            }
        };

        const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
            e.stopPropagation();
            handleElementDelete(element.id);
        };

        const renderDeleteButton = (): React.JSX.Element => (
            <button
                onClick={handleDeleteClick}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                type="button"
            >
                ×
            </button>
        );

        switch (type) {
            case 'h1':
                return (
                    <div className="relative" key={element.id}>
                        <h1 {...commonProps}>
                            {editingElement === element.id ? (
                                <input
                                    type="text"
                                    value={content as string}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleElementEdit(element.id, e.target.value)
                                    }
                                    onBlur={() => setEditingElement(null)}
                                    onKeyPress={handleInputKeyPress}
                                    className="w-full bg-transparent border-none outline-none"
                                    autoFocus
                                />
                            ) : (
                                content as string
                            )}
                        </h1>
                        {renderDeleteButton()}
                    </div>
                );

            case 'h2':
                return (
                    <div className="relative" key={element.id}>
                        <h2 {...commonProps}>
                            {editingElement === element.id ? (
                                <input
                                    type="text"
                                    value={content as string}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleElementEdit(element.id, e.target.value)
                                    }
                                    onBlur={() => setEditingElement(null)}
                                    onKeyPress={handleInputKeyPress}
                                    className="w-full bg-transparent border-none outline-none"
                                    autoFocus
                                />
                            ) : (
                                content as string
                            )}
                        </h2>
                        {renderDeleteButton()}
                    </div>
                );

            case 'p':
                return (
                    <div className="relative" key={element.id}>
                        <p {...commonProps}>
                            {editingElement === element.id ? (
                                <textarea
                                    value={content as string}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        handleElementEdit(element.id, e.target.value)
                                    }
                                    onBlur={() => setEditingElement(null)}
                                    className="w-full bg-transparent border-none outline-none resize-none"
                                    rows={3}
                                    autoFocus
                                />
                            ) : (
                                content as string
                            )}
                        </p>
                        {renderDeleteButton()}
                    </div>
                );

            case 'img':
                return (
                    <div className="relative" key={element.id}>
                        <div className="space-y-3">
                            {/* Image Input Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL or Upload
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="url"
                                        value={content as string}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleElementEdit(element.id, e.target.value)
                                        }
                                        placeholder="Enter image URL or upload below"
                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => handleImageClick(element.id)}
                                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="button"
                                    >
                                        📁 Upload
                                    </button>
                                </div>
                            </div>

                            {/* Image Display */}
                            {content && content !== 'https://via.placeholder.com/600x300/e5e7eb/9ca3af?text=Drag+Image+Here' && (
                                <div className="relative group">
                                    <Image
                                        className={`${className} border-2 border-gray-200 hover:border-blue-300 rounded transition-all`}
                                        src={content as string}
                                        alt="Uploaded content"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://via.placeholder.com/600x300/ef4444/ffffff?text=Failed+to+Load+Image';
                                        }}
                                    />

                                    {/* Image Actions Overlay */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleImageClick(element.id)}
                                                className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                                                type="button"
                                                title="Replace image"
                                            >
                                                🔄
                                            </button>
                                            <button
                                                onClick={() => handleElementEdit(element.id, '')}
                                                className="p-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
                                                type="button"
                                                title="Remove image"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Placeholder when no image */}
                            {(!content || content === 'https://via.placeholder.com/600x300/e5e7eb/9ca3af?text=Drag+Image+Here') && (
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                                    onClick={() => handleImageClick(element.id)}
                                >
                                    <div className="text-gray-400">
                                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-lg font-medium">No image selected</p>
                                        <p className="text-sm">Click to upload or enter URL above</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {renderDeleteButton()}
                    </div>
                );

            case 'a':
                const isEditMode = linkEditMode[element.id] || false;

                return (
                    <div className="relative" key={element.id}>
                        <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-white">
                            <div className="grid grid-cols-1 gap-3">
                                {/* Link Text Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Link Text
                                    </label>
                                    <input
                                        type="text"
                                        value={content as string}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleElementEdit(element.id, e.target.value, href)
                                        }
                                        disabled={!isEditMode}
                                        placeholder="Enter link text"
                                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditMode ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                            }`}
                                    />
                                </div>

                                {/* Link URL Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Link URL
                                    </label>
                                    <input
                                        type="url"
                                        value={href || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleElementEdit(element.id, content, e.target.value)
                                        }
                                        disabled={!isEditMode}
                                        placeholder="https://example.com"
                                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditMode ? 'bg-gray-50 text-gray-600' : 'bg-white'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center pt-2">
                                {/* Link Preview (only shown when not in edit mode) */}
                                {!isEditMode && content && href && (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                                    >
                                        Preview: {content as string}
                                    </a>
                                )}

                                {isEditMode && (
                                    <div className="text-sm text-gray-500">
                                        Editing mode - make your changes above
                                    </div>
                                )}

                                {/* Save/Edit Button */}
                                <button
                                    onClick={() => handleLinkSaveEdit(element.id)}
                                    className={`px-4 py-2 rounded-md font-medium transition-colors ${isEditMode
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    type="button"
                                >
                                    {isEditMode ? '💾 Save' : '✏️ Edit'}
                                </button>
                            </div>
                        </div>
                        {renderDeleteButton()}
                    </div>
                );

            case 'blockquote':
                return (
                    <div className="relative" key={element.id}>
                        <blockquote {...commonProps}>
                            {editingElement === element.id ? (
                                <textarea
                                    value={content as string}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        handleElementEdit(element.id, e.target.value)
                                    }
                                    onBlur={() => setEditingElement(null)}
                                    className="w-full bg-transparent border-none outline-none resize-none"
                                    rows={2}
                                    autoFocus
                                />
                            ) : (
                                `"${content as string}"`
                            )}
                        </blockquote>
                        {renderDeleteButton()}
                    </div>
                );

            case 'ul':
                return (
                    <div className="relative" key={element.id}>
                        <ul {...commonProps}>
                            {Array.isArray(content) ? content.map((item: string, index: number) => (
                                <li key={index}>{item}</li>
                            )) : (
                                <li>{content as string}</li>
                            )}
                        </ul>
                        {renderDeleteButton()}
                    </div>
                );

            default:
                return <div key={element.id}>Unknown element type</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="bg-black text-white p-2 rounded-lg">
                                    <span className="font-bold text-xl">B</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">Bloggr</span>
                            </Link>
                            <h1 className="text-xl font-semibold text-gray-700">Create Post</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                type="button"
                                aria-label="Save draft"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7h5v10z" />
                                </svg>
                            </button>
                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">A</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="flex">
                {/* Sidebar - Elements */}
                <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Elements</h2>
                        <div className="space-y-2">
                            {ELEMENTS.map((element: ElementType) => (
                                <div
                                    key={element.id}
                                    draggable
                                    onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, element)}
                                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 cursor-move hover:bg-gray-50 hover:border-gray-300 transition-colors"
                                >
                                    <span className="text-lg">{element.icon}</span>
                                    <span className="text-sm font-medium text-gray-700">{element.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Post Title */}
                        <div className="mb-8">
                            <input
                                type="text"
                                placeholder="Post Title"
                                value={postTitle}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value)}
                                className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent"
                            />
                        </div>

                        {/* Drop Zone */}
                        <div
                            ref={dropZoneRef}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`min-h-96 border-2 border-dashed border-gray-300 rounded-lg p-8 transition-colors ${droppedElements.length === 0 ? 'flex items-center justify-center' : ''
                                }`}
                        >
                            {droppedElements.length === 0 ? (
                                <div className="text-center">
                                    <div className="text-gray-400 text-6xl mb-4">📝</div>
                                    <p className="text-gray-500 text-lg mb-2">Drag and drop elements here</p>
                                    <p className="text-gray-400 text-sm">Start building your blog post by dragging elements from the sidebar</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {droppedElements.map(renderElement)}
                                </div>
                            )}
                        </div>

                        {/* Publish Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handlePublish}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                type="button"
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}