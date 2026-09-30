#!/usr/bin/env node
// public/blog/images 의 큰 PNG/JPG를 WebP로 바꾸고, 글 본문·매니페스트의 경로를 함께 갱신합니다.
// 새 글에 큰 사진을 넣은 뒤 실행하면 됩니다: node scripts/optimize-blog-images.mjs

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const IMAGE_DIR = path.join(ROOT, "public/blog/images");
const TEXT_FILES = [
  ...["content/blog", "content/drafts"].flatMap((d) => {
    const dir = path.join(ROOT, d);
    return fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => path.join(dir, f))
      : [];
  }),
  path.join(ROOT, "content/image-manifest.json"),
].filter((f) => fs.existsSync(f));

const MIN_BYTES = 200 * 1024;
const MAX_WIDTH = 1600;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );
}

const renames = new Map();
let before = 0;
let after = 0;

for (const file of walk(IMAGE_DIR)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const size = fs.statSync(file).size;
  if (size < MIN_BYTES) continue;

  const img = sharp(file, { failOn: "none" }).rotate();
  const meta = await img.metadata();
  const out = await (meta.width && meta.width > MAX_WIDTH ? img.resize({ width: MAX_WIDTH }) : img)
    .webp({ quality: 80 })
    .toBuffer();
  if (out.length > size * 0.8) continue;

  const target = file.replace(/\.(png|jpe?g)$/i, ".webp");
  if (fs.existsSync(target)) continue;
  fs.writeFileSync(target, out);
  fs.rmSync(file);
  before += size;
  after += out.length;
  const toUrl = (f) => "/" + path.relative(path.join(ROOT, "public"), f).split(path.sep).join("/");
  renames.set(toUrl(file), toUrl(target));
}

for (const file of TEXT_FILES) {
  let text = fs.readFileSync(file, "utf8");
  const original = text;
  for (const [from, to] of renames) text = text.split(`${from}"`).join(`${to}"`).split(`${from})`).join(`${to})`).split(`${from}\n`).join(`${to}\n`);
  if (text !== original) fs.writeFileSync(file, text);
}

console.log(
  `${renames.size}개 변환 · ${(before / 1048576).toFixed(1)}MB → ${(after / 1048576).toFixed(1)}MB`
);
