// Post-build fixes for the static export (runs after `next build` and the image
// optimiser):
//
// 1. Route prefetch files. The export writes per-segment prefetch data in
//    nested folders (…/__next.blog/category/$d$category/__PAGE__.txt), but the
//    Next.js client requests a flat, dotted name
//    (…/__next.blog.category.$d$category.__PAGE__.txt). Without a copy at the
//    dotted path, link prefetching 404s and navigation loses its instant feel.
//
// 2. Social-sharing images. Next renders them as PNG (~700 KB for photo cards);
//    WhatsApp often skips previews above ~300 KB, so they are re-encoded as JPEG.
//    Their metadata already declares image/jpeg and .htaccess serves them so.

import { copyFile, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('out');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full === path.join(OUT, '_next')) continue;
      yield { full, entry };
      yield* walk(full);
    } else {
      yield { full, entry };
    }
  }
}

async function* filesIn(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* filesIn(full);
    else yield full;
  }
}

// 1. Flatten nested prefetch folders into dotted file names.
let flattened = 0;
for await (const { full, entry } of walk(OUT)) {
  if (!entry.isDirectory() || !entry.name.startsWith('__next.')) continue;
  const parent = path.dirname(full);
  for await (const file of filesIn(full)) {
    const relative = path.relative(full, file).split(path.sep).join('.');
    const target = path.join(parent, `${entry.name}.${relative}`);
    await copyFile(file, target);
    flattened += 1;
  }
}
console.log(`Prefetch files: added ${flattened} flat copies.`);

// 2. Re-encode share images as JPEG.
let shared = 0;
for await (const file of filesIn(OUT)) {
  if (path.basename(file) !== 'opengraph-image') continue;
  const input = await readFile(file);
  const output = await sharp(input).flatten({ background: '#FAFAF8' }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(file, output);
  shared += 1;
  console.log(`Share image: ${path.relative(OUT, file)}  ${Math.round(input.length / 1024)} KB → ${Math.round(output.length / 1024)} KB`);
}
console.log(`Share images: optimised ${shared}.`);
