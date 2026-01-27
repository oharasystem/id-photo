'use client';

import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PHOTO_SIZES, PhotoSizeConfig, DEFAULT_PHOTO_SIZE, PhotoSizeId } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, ZoomIn, ZoomOut } from 'lucide-react';

interface PhotoCropperProps {
  imageSrc: string;
  onCropConfirm: (croppedAreaPixels: Area, sizeConfig: PhotoSizeConfig) => void;
  onCancel: () => void;
}

export function PhotoCropper({ imageSrc, onCropConfirm, onCancel }: PhotoCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState<PhotoSizeId>(DEFAULT_PHOTO_SIZE.id);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const selectedSize = Object.values(PHOTO_SIZES).find(s => s.id === selectedSizeId) || DEFAULT_PHOTO_SIZE;
  const aspect = selectedSize.widthMm / selectedSize.heightMm;

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = () => {
    if (croppedAreaPixels) {
      onCropConfirm(croppedAreaPixels, selectedSize);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onCancel} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          戻る
        </Button>
        <h2 className="font-semibold">写真の調整</h2>
        <div className="w-16" /> {/* Spacer */}
      </div>

      <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden shadow-lg border">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
          showGrid={true}
          objectFit="contain"
          // モバイルでの操作性を向上
          minZoom={1}
          maxZoom={3}
        />
        {/* 簡易的な顔位置ガイド (中央に楕円) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div
                className="border-2 border-white rounded-[50%]"
                style={{
                    width: `${200 * aspect}px`, // アスペクト比に合わせて幅を調整
                    height: '200px',
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)' // 周囲を暗くする
                }}
            />
            {/* 中心線 */}
            <div className="absolute w-full h-[1px] bg-white/50 top-1/2" />
            <div className="absolute h-full w-[1px] bg-white/50 left-1/2" />
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-3">
            <Label htmlFor="size-select">写真サイズ</Label>
            <Select
                value={selectedSizeId}
                onValueChange={(v) => setSelectedSizeId(v as PhotoSizeId)}
            >
                <SelectTrigger id="size-select" className="w-full">
                    <SelectValue placeholder="サイズを選択" />
                </SelectTrigger>
                <SelectContent>
                    {Object.values(PHOTO_SIZES).map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                            {size.label} ({size.description})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-3">
            <p className="text-sm text-muted-foreground">ドラッグで移動、下のバーで拡大縮小</p>
            <div className="flex justify-between">
                <Label>拡大・縮小</Label>
                <span className="text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
                <ZoomOut className="w-4 h-4 text-muted-foreground" />
                <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={(v) => onZoomChange(v[0])}
                    className="flex-1"
                />
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
            </div>
        </div>

        <Button onClick={handleConfirm} className="w-full gap-2" size="lg">
            <Check className="w-4 h-4" />
            このサイズで作成する
        </Button>
      </div>

      <p className="mt-4 text-xs text-center text-muted-foreground">
        ピンチイン・ピンチアウトでも拡大縮小できます
      </p>
    </div>
  );
}
