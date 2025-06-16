"use client";

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ImageExt from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common';
import { useRef } from 'react';

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [2, 3] }),
      Blockquote,
      HorizontalRule,
      ImageExt,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      alert('Tipo de arquivo não permitido. Use apenas imagens (JPEG, PNG, WebP ou GIF)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Arquivo muito grande. Tamanho máximo: 5MB');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Erro ao fazer upload');
      return;
    }
    // Prompt para texto alternativo
    const alt = prompt('Digite o texto alternativo da imagem:') || '';
    editor?.chain().focus().setImage({ src: data.url, alt }).run();
  };

  return (
    <div>
      <div className="flex gap-2 mb-2 flex-wrap">
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded">H2</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className="px-2 py-1 border rounded">H3</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="px-2 py-1 border rounded">Citação</button>
        <button type="button" onClick={() => editor?.chain().focus().setHorizontalRule().run()} className="px-2 py-1 border rounded">Linha</button>
        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-2 py-1 border rounded">Imagem</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded">Lista</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded">Lista Num.</button>
        <button type="button" onClick={() => {
          const url = prompt('Digite a URL do link:');
          if (url) editor?.chain().focus().setLink({ href: url }).run();
        }} className="px-2 py-1 border rounded">Link</button>
        <button type="button" onClick={() => editor?.chain().focus().unsetLink().run()} className="px-2 py-1 border rounded">Remover Link</button>
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign('left').run()} className="px-2 py-1 border rounded">Esq.</button>
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign('center').run()} className="px-2 py-1 border rounded">Centro</button>
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign('right').run()} className="px-2 py-1 border rounded">Dir.</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="px-2 py-1 border rounded">Code</button>
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      <div className="border rounded bg-white min-h-[200px] p-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
} 