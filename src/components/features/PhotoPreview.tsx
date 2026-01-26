'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PhotoPreviewProps {
  sheetDataUrl: string;
  onReset: () => void;
  onBack: () => void;
}

export function PhotoPreview({ sheetDataUrl, onReset, onBack }: PhotoPreviewProps) {
  const handleDownload = () => {
    const fileName = '証明写真_L判サイズで印刷してください.jpg';
    saveAs(sheetDataUrl, fileName);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          再調整
        </Button>
        <h2 className="font-semibold">プレビューと保存</h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-1">
          <RefreshCw className="w-4 h-4" />
          最初から
        </Button>
      </div>

      <Card className="p-2 bg-white shadow-lg border overflow-hidden">
        {/* L判プレビュー */}
        <div className="relative w-full aspect-[89/127] bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={sheetDataUrl}
                alt="証明写真プレビュー"
                className="w-full h-full object-contain"
            />
        </div>
      </Card>

      <div className="mt-6 space-y-6">
        <div className="text-center space-y-1">
            <p className="text-sm font-medium">L判サイズ (89mm x 127mm) で生成されました</p>
            <p className="text-xs text-muted-foreground">コンビニのマルチコピー機などで印刷してください</p>
        </div>

        <Button onClick={handleDownload} className="w-full gap-2" variant="default" size="lg">
            <Download className="w-4 h-4" />
            画像を保存する (JPG)
        </Button>

        {/* 広告スペース: 「画像を保存する」ボタンの直下 */}
        <div className="w-full min-h-[100px] bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center p-4">
            <p className="text-sm text-muted-foreground">広告スペース</p>
        </div>

        <div className="text-xs text-muted-foreground text-center bg-muted/50 p-3 rounded">
            <p>※保存された画像は、お使いの端末の写真アプリ等で確認できます。</p>
            <p className="mt-1">※印刷時は「L判」を選択し、「余白なし」または「引き伸ばさない」設定を推奨します。</p>
        </div>
      </div>
    </div>
  );
}
