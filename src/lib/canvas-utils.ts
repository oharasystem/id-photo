import { Area } from 'react-easy-crop';
import { L_SIZE_WIDTH_PX, L_SIZE_HEIGHT_PX, PIXEL_PER_MM, PhotoSizeConfig } from './constants';

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * 画像をトリミングしてCanvasを返す
 * @param imageSrc 画像のURL
 * @param pixelCrop トリミング領域 (px)
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // キャンバスサイズを切り取りサイズに設定
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // 画像を描画
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas;
}

/**
 * L判サイズのシートを作成する
 * @param croppedImage トリミング済みの画像Canvas
 * @param config 写真サイズ設定
 */
export async function generatePhotoSheet(
  croppedImage: HTMLCanvasElement,
  config: PhotoSizeConfig
): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // L判サイズ (300dpi)
  canvas.width = L_SIZE_WIDTH_PX;
  canvas.height = L_SIZE_HEIGHT_PX;

  // 背景を白にする
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 写真1枚あたりのサイズ (px)
  const photoWidthPx = Math.round(config.widthMm * PIXEL_PER_MM);
  const photoHeightPx = Math.round(config.heightMm * PIXEL_PER_MM);

  // 配置計算
  let cols = 0;
  let rows = 0;

  // 基本的な配置ロジック
  if (config.id === 'driver') {
    // 運転免許証 (30x24) -> 縦配置だか幅24mmなので、横に3枚、縦に2枚で6枚配置
    // 横幅: 24mm * 3 = 72mm (L判89mm) -> 余裕あり
    // 縦幅: 30mm * 2 = 60mm (L判127mm) -> 余裕あり
    cols = 3;
    rows = 2;
  } else {
    // 履歴書 (30x40) -> 横2枚、縦2枚 = 4枚
    // パスポート (35x45) -> 横2枚、縦2枚 = 4枚
    cols = 2;
    rows = 2;
  }

  // 全体のコンテンツサイズ
  const contentWidth = cols * photoWidthPx;
  const contentHeight = rows * photoHeightPx;

  // 開始位置（中央揃え）
  const startX = (canvas.width - contentWidth) / 2;
  const startY = (canvas.height - contentHeight) / 2;

  // 写真の描画とガイド線
  ctx.lineWidth = 1; // 1px
  // 点線設定 (クロップマーク用) - 実線か点線かは要件次第だが、「薄いグレーの実線または点線」とのこと
  // ここでは実線で見やすくする、ただし薄くする
  ctx.strokeStyle = '#cccccc';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * photoWidthPx;
      const y = startY + r * photoHeightPx;

      // 写真描画
      ctx.drawImage(croppedImage, 0, 0, croppedImage.width, croppedImage.height, x, y, photoWidthPx, photoHeightPx);

      // 写真周囲の枠線（クロップマーク）
      ctx.strokeRect(x, y, photoWidthPx, photoHeightPx);
    }
  }

  // 外枠グリッド（フルグリッド）をさらに明確にする場合
  // すべての境界線を描画済みなので、これ以上は不要かもしれないが
  // 切断用ガイドとして、用紙端まで線を伸ばすトンボも一般的だが
  // 今回は「フルグリッド」＝写真の周囲を囲む、ということなので上記で十分と思われる。
  // ただし、余白部分にも線があったほうが切りやすい場合はあるが、
  // 要件「写真の周囲を囲ってください」に従い、strokeRectで各写真を囲む形とする。

  return canvas.toDataURL('image/jpeg', 0.95);
}
