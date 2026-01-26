export const DPI = 300;
export const MM_TO_INCH = 25.4;
export const PIXEL_PER_MM = DPI / MM_TO_INCH;

export const L_SIZE_WIDTH_MM = 89;
export const L_SIZE_HEIGHT_MM = 127;
// 300dpiでのピクセル数: 1051 x 1500
export const L_SIZE_WIDTH_PX = Math.round(L_SIZE_WIDTH_MM * PIXEL_PER_MM);
export const L_SIZE_HEIGHT_PX = Math.round(L_SIZE_HEIGHT_MM * PIXEL_PER_MM);

export type PhotoSizeId = 'resume' | 'driver' | 'passport';

export interface PhotoSizeConfig {
  id: PhotoSizeId;
  label: string;
  widthMm: number;
  heightMm: number;
  count: number;
  description: string;
}

export const PHOTO_SIZES: Record<string, PhotoSizeConfig> = {
  RESUME: {
    id: 'resume',
    label: '履歴書用',
    widthMm: 30,
    heightMm: 40,
    count: 4,
    description: '40mm x 30mm (履歴書・在留カードなど)',
  },
  DRIVER: {
    id: 'driver',
    label: '運転免許証用',
    widthMm: 24,
    heightMm: 30,
    count: 6,
    description: '30mm x 24mm (運転免許証など)',
  },
  PASSPORT: {
    id: 'passport',
    label: 'マイナンバー/パスポート',
    widthMm: 35,
    heightMm: 45,
    count: 4,
    description: '45mm x 35mm (マイナンバー・パスポートなど)',
  },
} as const;

export const DEFAULT_PHOTO_SIZE = PHOTO_SIZES.RESUME;
