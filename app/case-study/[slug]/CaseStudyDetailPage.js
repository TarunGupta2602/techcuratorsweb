'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

const CaseStudyDetailPage = ({ caseStudy }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollButton(scrollTop > 300);

      if (contentRef.current) {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / totalHeight) * 100;
        setReadingProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#326B3F] z-50 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Header */}
      <div className="relative h-96 bg-gray-900 mb-16">
        <div className="absolute inset-0 opacity-80">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="w-full h-full object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{caseStudy.title}</h1>
            <div className="flex items-center text-gray-200 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-medium">{caseStudy.author?.charAt(0).toUpperCase()}</span>
                </div>
                <span className="font-medium">{caseStudy.author}</span>
              </div>
              <span className="mx-3">•</span>
              <span>{formatDate(caseStudy.date_posted)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={`max-w-4xl mx-auto px-4 transition-opacity duration-1000 ease-out ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="prose prose-lg max-w-none text-gray-700">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold my-2" {...props} />,
              p: ({ node, ...props }) => <p className="my-4" {...props} />,
              a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
              ),
              code: ({ node, ...props }) => <code className="bg-gray-100 p-1 rounded" {...props} />,
              pre: ({ node, ...props }) => (
                <pre className="bg-gray-100 p-4 rounded my-4 overflow-auto" {...props} />
              ),
              table: ({ node, ...props }) => <table className="table-auto my-6 w-full" {...props} />,
              thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
              tbody: ({ node, ...props }) => <tbody {...props} />,
              tr: ({ node, ...props }) => <tr className="border-b" {...props} />,
              th: ({ node, ...props }) => <th className="px-4 py-2 text-left" {...props} />,
              td: ({ node, ...props }) => <td className="px-4 py-2" {...props} />,
              del: ({ node, ...props }) => <del className="line-through" {...props} />,
            }}
          >
            {caseStudy.description?.replace(/\\n/g, '\n') || ''}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {caseStudy.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 md:mt-22 md:mb-22 mb-12 flex justify-center">
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Published on {formatDate(caseStudy.date_posted)}</span>
          </div>
        </div>
      </div>

      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-[#326B3F] text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110 ${
          showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default CaseStudyDetailPage;
