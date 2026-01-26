'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  onImageSelect: (imageUrl: string) => void;
}

export function PhotoUploader({ onImageSelect }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelect(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          完全無料・登録不要
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">証明写真マスター</h1>
        <p className="text-muted-foreground leading-relaxed">
          スマホで撮って<span className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">コンビニ30円印刷</span><br />
          履歴書・免許証・パスポート対応
        </p>
      </div>

      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-300 cursor-pointer group relative overflow-hidden",
          isDragging
            ? "border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]"
            : "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-sm"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className={cn(
            "p-5 rounded-full transition-colors duration-300",
            isDragging ? "bg-indigo-200 text-indigo-700" : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 group-hover:text-indigo-700"
          )}>
            <Upload className="w-10 h-10" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-base font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">
              クリックして写真を選択
            </p>
            <p className="text-sm text-muted-foreground">
              またはドラッグ＆ドロップ
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
        <ShieldCheck className="w-5 h-5 flex-shrink-0" />
        <p>
          選択した画像はサーバーへ送信されません。すべての処理はお使いの端末内で完結するため、安心してご利用いただけます。
        </p>
      </div>
    </div>
  );
}
