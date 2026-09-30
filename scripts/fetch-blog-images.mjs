#!/usr/bin/env node
// content/image-manifest.json 에 기록된 원본 이미지를 public/ 아래로 내려받습니다.
//
// - 이미 받은 파일은 건너뜁니다 (여러 번 실행해도 안전)
// - 가로 1600px 초과 이미지는 줄이고, 원본보다 작아질 때만 재압축본을 저장합니다
// - 확장자가 .auto 인 항목은 Content-Type으로 확장자를 정해 본문 경로를 갱신합니다
// - 끝내 받지 못한 이미지는 본문에서 원본 URL로 되돌리고 content/image-fetch-report.json 에 기록합니다

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const MANIFEST_PATH = path.join(ROOT, "content/image-manifest.json");
const REPORT_PATH = path.join(ROOT, "content/image-fetch-report.json");
const CONTENT_DIRS = ["content/blog", "content/drafts"].map((d) => path.join(ROOT, d));
const MAX_WIDTH = 1600;
const CONCURRENCY = 6;

const EXT_BY_TYPE = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const replacements = new Map(); // 본문에서 바꿔야 할 경로: old → new
const failures = [];
let downloaded = 0;
let skipped = 0;
let savedBytes = 0;

async function fetchWithRetry(url, tries = 3) {
  let lastError;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (blog image migration)" },
        redirect: "follow",
        signal: AbortSignal.timeout(30_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
    }
  }
  throw lastError;
}

async function optimize(buf, ext) {
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) return buf;
  try {
    let img = sharp(buf, { failOn: "none" }).rotate();
    const meta = await img.metadata();
    if ((meta.pages ?? 1) > 1) return buf; // 애니메이션 이미지는 그대로
    if (meta.width && meta.width > MAX_WIDTH) img = img.resize({ width: MAX_WIDTH });
    const out =
      ext === ".png"
        ? await img.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
        : ext === ".webp"
          ? await img.webp({ quality: 82 }).toBuffer()
          : await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    return out.length < buf.length ? out : buf;
  } catch {
    return buf;
  }
}

async function handle(local, source) {
  let target = local;
  if (!local.endsWith(".auto")) {
    if (fs.existsSync(path.join(ROOT, "public", local))) {
      skipped++;
      return;
    }
  }
  try {
    const res = await fetchWithRetry(source);
    const type = (res.headers.get("content-type") || "").split(";")[0].trim();
    if (!type.startsWith("image/")) throw new Error(`이미지가 아님 (${type || "unknown"})`);
    if (local.endsWith(".auto")) {
      target = local.replace(/\.auto$/, EXT_BY_TYPE[type] || ".img");
      replacements.set(local, target);
      delete manifest[local];
      manifest[target] = source;
    }
    const raw = Buffer.from(await res.arrayBuffer());
    const buf = await optimize(raw, path.extname(target).toLowerCase());
    savedBytes += raw.length - buf.length;
    const file = path.join(ROOT, "public", target);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, buf);
    downloaded++;
  } catch (err) {
    failures.push({ local, source, error: String(err?.message || err) });
    replacements.set(local, source);
    delete manifest[local];
  }
}

const entries = Object.entries(manifest);
let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < entries.length) {
      const [local, source] = entries[cursor++];
      await handle(local, source);
    }
  })
);

if (replacements.size) {
  for (const dir of CONTENT_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const file = path.join(dir, name);
      let text = fs.readFileSync(file, "utf8");
      const before = text;
      for (const [from, to] of replacements) text = text.split(from).join(to);
      if (text !== before) fs.writeFileSync(file, text);
    }
  }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n");

const previous = fs.existsSync(REPORT_PATH) ? JSON.parse(fs.readFileSync(REPORT_PATH, "utf8")).failures : [];
fs.writeFileSync(
  REPORT_PATH,
  JSON.stringify({ failures: [...previous, ...failures] }, null, 2) + "\n"
);

console.log(
  `받음 ${downloaded} · 이미 있음 ${skipped} · 실패 ${failures.length} · 압축으로 절약 ${(savedBytes / 1024 / 1024).toFixed(1)}MB`
);
for (const f of failures) console.log(`  ✗ ${f.source} (${f.error})`);
