'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, ImageIcon } from 'lucide-react';
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
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">証明写真マスター</h1>
        <p className="text-muted-foreground">
          スマホで撮ってコンビニ30円印刷。<br />
          履歴書・免許証・パスポート対応。
        </p>
      </div>

      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer hover:bg-muted/50",
          isDragging ? "border-primary bg-muted" : "border-muted-foreground/25"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">クリックして写真を選択</p>
            <p className="text-xs text-muted-foreground">またはドラッグ＆ドロップ</p>
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

      <div className="space-y-4 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          撮影のポイント
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>明るい場所で、白い壁を背景に撮影してください</li>
          <li>顔に影ができないように正面から撮影してください</li>
          <li>事前にスマホの写真アプリ等で明るさを調整しておくと綺麗に仕上がります</li>
        </ul>
      </div>
    </div>
  );
}
