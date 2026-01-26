'use client';

import React, { useState } from 'react';
import { PhotoUploader } from '@/components/features/PhotoUploader';
import { PhotoCropper } from '@/components/features/PhotoCropper';
import { PhotoPreview } from '@/components/features/PhotoPreview';
import { LandingContent } from '@/components/features/LandingContent';
import { getCroppedImg, generatePhotoSheet } from '@/lib/canvas-utils';
import { Area } from 'react-easy-crop';
import { PhotoSizeConfig } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

type Step = 'upload' | 'crop' | 'preview';

export default function Home() {
  const [step, setStep] = useState<Step>('upload');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [sheetDataUrl, setSheetDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = (url: string) => {
    setImageSrc(url);
    setStep('crop');
  };

  const handleCropConfirm = async (croppedAreaPixels: Area, sizeConfig: PhotoSizeConfig) => {
    if (!imageSrc) return;
    setIsProcessing(true);

    // UIレンダリングをブロックしないように少し待つ
    setTimeout(async () => {
      try {
        const croppedImageCanvas = await getCroppedImg(imageSrc, croppedAreaPixels);
        const sheet = await generatePhotoSheet(croppedImageCanvas, sizeConfig);
        setSheetDataUrl(sheet);
        setStep('preview');
      } catch (e) {
        console.error(e);
        alert('画像の処理中にエラーが発生しました。別の画像を試してみてください。');
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  const handleReset = () => {
    if (confirm('最初の画面に戻りますか？作成中のデータは失われます。')) {
      setImageSrc(null);
      setSheetDataUrl(null);
      setStep('upload');
    }
  };

  const handleBackToCrop = () => {
    setStep('crop');
  }

  return (
    <div className="bg-slate-50 text-slate-900 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <main className="w-full max-w-md bg-white rounded-xl shadow-sm border p-6 min-h-[600px] relative transition-all duration-300">
        {step === 'upload' && (
          <PhotoUploader onImageSelect={handleImageSelect} />
        )}

        {step === 'crop' && imageSrc && (
          <PhotoCropper
            imageSrc={imageSrc}
            onCropConfirm={(area, config) => {
              setIsProcessing(true);
              handleCropConfirm(area, config);
            }}
            onCancel={() => setStep('upload')}
          />
        )}

        {step === 'preview' && sheetDataUrl && (
          <PhotoPreview
            sheetDataUrl={sheetDataUrl}
            onReset={handleReset}
            onBack={handleBackToCrop}
          />
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4 rounded-xl">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="font-medium text-muted-foreground">証明写真データを作成中...</p>
          </div>
        )}
      </main>

      {step === 'upload' && <LandingContent />}
    </div>
  );
}

