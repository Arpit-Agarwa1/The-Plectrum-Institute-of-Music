/**
 * Removes edge-connected black (and near-black) from branding PNGs so the mark
 * is truly transparent on the site. Run: npm run branding:transparent
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const branding = join(__dirname, "../public/branding");
const files = ["logo-brown.png", "logo-cream.png"];

/**
 * Only treat near-black as removable background so mid/dark brown in the art
 * is not flood-removed. Re-run after replacing PNGs in `public/branding/`.
 */
function isBackground(r, g, b) {
  const max = Math.max(r, g, b);
  const sum = r + g + b;
  return max < 38 && sum < 100;
}

/**
 * Flood fill from all border pixels: transparent where black connects to the edge
 * (typical for logos on a black canvas)
 */
function floodRemoveBackgroundEdge(data, w, h) {
  const n = w * h;
  const out = new Uint8Array(data);
  const vis = new Uint8Array(n);
  const q = new Array(n);
  const idx = (x, y) => y * w + x;

  let head = 0;
  let tail = 0;
  const push = (i) => {
    if (vis[i]) return;
    const o = i * 4;
    const r = out[o];
    const g = out[o + 1];
    const b = out[o + 2];
    if (!isBackground(r, g, b)) return;
    vis[i] = 1;
    out[o + 3] = 0;
    q[tail++] = i;
  };

  for (let x = 0; x < w; x++) {
    push(idx(x, 0));
    push(idx(x, h - 1));
  }
  for (let y = 0; y < h; y++) {
    push(idx(0, y));
    push(idx(w - 1, y));
  }

  while (head < tail) {
    const i = q[head++];
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(idx(x - 1, y));
    if (x < w - 1) push(idx(x + 1, y));
    if (y > 0) push(idx(x, y - 1));
    if (y < h - 1) push(idx(x, y + 1));
  }
  return out;
}

for (const name of files) {
  const path = join(branding, name);
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (info.channels !== 4) {
    throw new Error(`${name}: expected 4 channels`);
  }
  const out = floodRemoveBackgroundEdge(
    new Uint8Array(data),
    info.width,
    info.height
  );
  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 8 })
    .toFile(path);
  console.log("OK", name, info.width, "x", info.height);
}
