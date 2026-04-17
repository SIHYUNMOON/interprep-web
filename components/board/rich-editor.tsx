'use client';

import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useAuth } from '@/lib/auth-context';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  ImageIcon,
  X,
} from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichEditor({ value, onChange, placeholder = '내용을 입력하세요...' }: RichEditorProps) {
  const { getAuthToken } = useAuth();
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'mb-2',
          },
        },
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleAddImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !editor) return;

      try {
        const formData = new FormData();
        formData.append('file', file);

        console.log('[v0] Uploading image:', file.name, 'Size:', file.size);

        const token = getAuthToken();
        // Don't set Content-Type manually - let browser set it with boundary for FormData
        const headers: HeadersInit | undefined = token ? {
          'Authorization': `Bearer ${token}`,
        } : undefined;

        const response = await fetch('/api/uploads/image', {
          method: 'POST',
          headers,
          body: formData,
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMsg = data.error || '이미지 업로드에 실패했습니다.';
          console.error('[v0] Image upload failed:', data);
          alert(errorMsg);
          return;
        }

        console.log('[v0] Image uploaded successfully:', data.url);
        const { url } = data;
        editor.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('[v0] Image upload error:', errorMessage, error);
        alert('이미지 업로드에 실패했습니다: ' + errorMessage);
      }
    };

    input.click();
  }, [editor]);

  if (!editor) return null;

  const toolbarButtonClass = 'p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer';

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {/* Text Style */}
        <div className="flex gap-0.5 border-r border-gray-300 pr-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${toolbarButtonClass} ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="Bold"
            type="button"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${toolbarButtonClass} ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="Italic"
            type="button"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${toolbarButtonClass} ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
            title="Strikethrough"
            type="button"
          >
            <Strikethrough size={18} />
          </button>
        </div>

        {/* Lists and Formatting */}
        <div className="flex gap-0.5 border-r border-gray-300 pr-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${toolbarButtonClass} ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="Bullet List"
            type="button"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${toolbarButtonClass} ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="Ordered List"
            type="button"
          >
            <ListOrdered size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${toolbarButtonClass} ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
            title="Quote"
            type="button"
          >
            <Quote size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${toolbarButtonClass} ${editor.isActive('codeBlock') ? 'bg-gray-200' : ''}`}
            title="Code Block"
            type="button"
          >
            <Code size={18} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex gap-0.5 border-r border-gray-300 pr-1">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`${toolbarButtonClass} ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            title="Align Left"
            type="button"
          >
            <AlignLeft size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`${toolbarButtonClass} ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            title="Align Center"
            type="button"
          >
            <AlignCenter size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`${toolbarButtonClass} ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            title="Align Right"
            type="button"
          >
            <AlignRight size={18} />
          </button>
        </div>

        {/* Media */}
        <div className="flex gap-0.5 border-r border-gray-300 pr-1">
          <button
            onClick={handleAddImage}
            className={toolbarButtonClass}
            title="Add Image"
            type="button"
          >
            <ImageIcon size={18} />
          </button>
        </div>

        {/* History */}
        <div className="flex gap-0.5">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className={toolbarButtonClass}
            title="Undo"
            type="button"
          >
            <Undo2 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className={toolbarButtonClass}
            title="Redo"
            type="button"
          >
            <Redo2 size={18} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-96 focus:outline-none"
      />
    </div>
  );
}
