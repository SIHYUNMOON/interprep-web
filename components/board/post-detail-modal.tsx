'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    title: string;
    author: string;
    created_at: string;
    views: number;
    content_html: string;
  } | null;
}

export function PostDetailModal({ isOpen, onClose, post }: PostDetailModalProps) {
  if (!post) return null;

  const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <article>
          <h1 className="text-3xl font-bold text-foreground mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
            <span className="text-sm text-muted-foreground">작성자: {post.author}</span>
            <span className="text-sm text-muted-foreground">{formattedDate}</span>
            <span className="text-sm text-muted-foreground">조회: {post.views}</span>
          </div>

          <div
            className="mb-8 text-foreground [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:min-h-[1.5em] [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </div>
    </div>
  );
}
