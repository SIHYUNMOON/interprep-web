'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RichEditor } from './rich-editor';
import { X } from 'lucide-react';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (title: string, contentHtml: string) => Promise<void>;
  isLoading?: boolean;
}

export function WriteModal({ isOpen, onClose, onPublish, isLoading }: WriteModalProps) {
  const [title, setTitle] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [error, setError] = useState('');

  const handlePublish = async () => {
    setError('');

    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (!contentHtml.trim() || contentHtml === '<p></p>') {
      setError('내용을 입력해주세요.');
      return;
    }

    try {
      await onPublish(title, contentHtml);
      setTitle('');
      setContentHtml('');
    } catch (err) {
      setError('게시물 등록에 실패했습니다.');
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">글쓰기</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              제목
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              disabled={isLoading}
              autoFocus
              className="text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              내용
            </label>
            <RichEditor
              value={contentHtml}
              onChange={setContentHtml}
              placeholder="내용을 입력하세요..."
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePublish}
              className="flex-1 bg-red-700 hover:bg-red-800"
              disabled={isLoading}
            >
              {isLoading ? '발행 중...' : '발행'}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              취소
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
