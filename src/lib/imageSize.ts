import path from 'node:path';
import sharp from 'sharp';

export interface ImageSize {
  width: number;
  height: number;
}

// Pixel size of an image in public/, as it is displayed (phone photos are often
// stored sideways with a "rotate me" flag, so those are swapped). Build-time
// only: call it from server components, never from client code.
export async function publicImageSize(src: string): Promise<ImageSize> {
  const { width = 1, height = 1, orientation = 1 } = await sharp(path.join(process.cwd(), 'public', src)).metadata();
  return orientation >= 5 ? { width: height, height: width } : { width, height };
}
