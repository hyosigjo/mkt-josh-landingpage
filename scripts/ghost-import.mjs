#!/usr/bin/env node
// Ghost 내보내기 JSON → content/blog/*.md (공개 글), content/drafts/*.md (초안·회원 전용 글)
//
// 사용법: node scripts/ghost-import.mjs <ghost-export.json>
//
// 이미지는 /blog/images/... 로컬 경로로 치환되고, 원본 URL은 content/image-manifest.json 에 기록됩니다.
// 실제 다운로드는 scripts/fetch-blog-images.mjs 가 담당합니다.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import TurndownService from "turndown";
import { gfm } from "@joplin/turndown-plugin-gfm";
import matter from "gray-matter";

const GHOST_ORIGIN = "https://blog.joshlife.co.kr";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const BLOG_DIR = path.join(ROOT, "content/blog");
const DRAFT_DIR = path.join(ROOT, "content/drafts");
const MANIFEST_PATH = path.join(ROOT, "content/image-manifest.json");
const TAGS_PATH = path.join(ROOT, "content/tags.json");

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

const input = process.argv[2];
if (!input) {
  console.error("사용법: node scripts/ghost-import.mjs <ghost-export.json>");
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(input, "utf8")).db[0].data;
const manifest = {};

// ---------- URL mapping ----------

function toAbsolute(url) {
  return url.replace(/^__GHOST_URL__/, GHOST_ORIGIN);
}

function isGhostContentImage(url) {
  return /^https?:\/\/blog\.joshlife\.co\.kr\/content\/images\//.test(url);
}

/** 이미지 URL → 로컬 경로 (/blog/images/...). 매핑 불가하면 원본 URL 반환 */
function mapImage(rawUrl) {
  if (!rawUrl) return rawUrl;
  const url = toAbsolute(rawUrl.trim());
  if (!/^https?:\/\//.test(url)) return url;

  const ghost = url.match(
    /^https?:\/\/blog\.joshlife\.co\.kr\/content\/images\/(?:size\/w\d+(?:h\d+)?\/)?(?:format\/\w+\/)?(.+)$/
  );
  let local;
  let source;
  if (ghost) {
    const rel = decodeURIComponent(ghost[1].split("?")[0]);
    source = `${GHOST_ORIGIN}/content/images/${ghost[1].split("?")[0]}`;
    local = /^[A-Za-z0-9._\/-]+$/.test(rel)
      ? `/blog/images/${rel}`
      : `/blog/images/${path.posix.dirname(rel)}/${hash(rel)}${path.posix.extname(rel).toLowerCase()}`;
  } else {
    source = url;
    const pathname = new URL(url).pathname;
    const ext = IMAGE_EXT.test(pathname)
      ? path.posix.extname(pathname).toLowerCase()
      : ".auto"; // 확장자는 다운로드 시 Content-Type으로 결정
    local = `/blog/images/external/${hash(url)}${ext}`;
  }
  manifest[local] = source;
  return local;
}

/** 블로그 내부 링크 → 새 사이트 경로 */
function mapHref(rawHref) {
  if (!rawHref) return rawHref;
  const href = toAbsolute(rawHref.trim());
  if (isGhostContentImage(href)) return mapImage(href);
  const m = href.match(/^https?:\/\/blog\.joshlife\.co\.kr(\/[^?#]*)?([?#].*)?$/);
  if (!m) return stripGhostRef(href);
  const p = (m[1] || "/").replace(/\/+$/, "");
  if (p === "") return "/blog";
  const tag = p.match(/^\/tag\/([^/]+)$/);
  if (tag) return `/blog/tag/${tag[1]}`;
  if (/^\/[^/]+$/.test(p)) return `/blog${p}${m[2] && m[2].startsWith("#") ? m[2] : ""}`;
  return href;
}

/** Ghost가 외부 링크에 자동으로 붙이는 ?ref=blog.joshlife.co.kr 제거 */
function stripGhostRef(href) {
  return href
    .replace(/([?&])ref=blog\.joshlife\.co\.kr(&|$)/, (_m, sep, tail) => (tail ? sep : ""))
    .replace(/[?&]$/, "");
}

function hash(s) {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 12);
}

// ---------- HTML → Markdown ----------

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
  hr: "---",
});
td.use(gfm);

const hasClass = (node, cls) =>
  node.nodeType === 1 && (" " + (node.getAttribute("class") || "") + " ").includes(` ${cls} `);
const find = (node, cls) => node.querySelector(`.${cls}`);
const escapeAttr = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

td.remove(["script", "style", "noscript", "button", "svg"]);
td.remove((node) => hasClass(node, "adsbygoogle"));

// Ghost 콜아웃 → "> 💡 내용" (렌더링 시 이모지로 시작하는 인용문은 콜아웃 박스로 표시)
td.addRule("ghostCallout", {
  filter: (node) => hasClass(node, "kg-callout-card"),
  replacement: (_c, node) => {
    const emoji = find(node, "kg-callout-emoji")?.textContent.trim() ?? "";
    const text = td.turndown(find(node, "kg-callout-text")?.innerHTML ?? "").trim();
    const body = (emoji ? `${emoji} ` : "") + text;
    return "\n\n" + body.split("\n").map((l) => (l ? `> ${l}` : ">")).join("\n") + "\n\n";
  },
});

// Ghost 토글 → <details>
td.addRule("ghostToggle", {
  filter: (node) => hasClass(node, "kg-toggle-card"),
  replacement: (_c, node) => {
    const heading = find(node, "kg-toggle-heading-text")?.textContent.trim() ?? "";
    const body = td.turndown(find(node, "kg-toggle-content")?.innerHTML ?? "").trim();
    return `\n\n<details>\n<summary>${escapeText(heading)}</summary>\n\n${body}\n\n</details>\n\n`;
  },
});

// Ghost 북마크 카드 → 링크 카드 HTML
td.addRule("ghostBookmark", {
  filter: (node) => hasClass(node, "kg-bookmark-card"),
  replacement: (_c, node) => {
    const a = node.querySelector("a");
    const href = mapHref(a?.getAttribute("href") ?? "");
    const title = find(node, "kg-bookmark-title")?.textContent.trim() ?? href;
    // 원본에서 잘린 채 저장된 멀티바이트 문자(U+FFFD)는 말줄임표로
    const desc = (find(node, "kg-bookmark-description")?.textContent.trim() ?? "").replace(/\uFFFD+$/, "…");
    const publisher =
      find(node, "kg-bookmark-publisher")?.textContent.trim() ||
      find(node, "kg-bookmark-author")?.textContent.trim() ||
      "";
    const thumb = find(node, "kg-bookmark-thumbnail")?.querySelector("img")?.getAttribute("src");
    const img = thumb ? `<img src="${escapeAttr(mapImage(thumb))}" alt="" loading="lazy">` : "";
    return (
      `\n\n<div class="bookmark-card"><a href="${escapeAttr(href)}" target="_blank" rel="noopener">` +
      `<span class="bookmark-body"><strong>${escapeText(title)}</strong>` +
      (desc ? `<span>${escapeText(desc)}</span>` : "") +
      (publisher ? `<small>${escapeText(publisher)}</small>` : "") +
      `</span>${img}</a></div>\n\n`
    );
  },
});

// 캡션 있는 이미지 → <figure>, 없으면 마크다운 이미지
td.addRule("ghostImageCard", {
  filter: (node) => node.nodeName === "FIGURE" && hasClass(node, "kg-image-card"),
  replacement: (_c, node) => {
    const img = node.querySelector("img");
    if (!img) return "";
    const src = mapImage(img.getAttribute("src"));
    const alt = img.getAttribute("alt") || "";
    const caption = node.querySelector("figcaption");
    const linkHref = node.querySelector("a")?.getAttribute("href");
    let imgHtml = `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy">`;
    if (linkHref) imgHtml = `<a href="${escapeAttr(mapHref(linkHref))}">${imgHtml}</a>`;
    if (caption && caption.textContent.trim()) {
      const capHtml = caption.innerHTML
        .replace(/<span style="white-space: pre-wrap;">(.*?)<\/span>/g, "$1")
        .replace(/\s(?:style|class|dir)="[^"]*"/g, "")
        .replace(/<b>(<strong>.*?<\/strong>)<\/b>/g, "$1")
        .replace(/href="([^"]*)"/g, (_m, h) => `href="${escapeAttr(mapHref(h.replace(/&amp;/g, "&")))}"`)
        .trim();
      return `\n\n<figure>${imgHtml}<figcaption>${capHtml}</figcaption></figure>\n\n`;
    }
    if (linkHref) return `\n\n${imgHtml}\n\n`;
    return `\n\n![${alt.replace(/[\[\]]/g, "")}](${src})\n\n`;
  },
});

td.addRule("image", {
  filter: "img",
  replacement: (_c, node) => {
    const src = mapImage(node.getAttribute("src"));
    if (!src) return "";
    const alt = (node.getAttribute("alt") || "").replace(/[\[\]]/g, "");
    return `![${alt}](${src})`;
  },
});

td.addRule("link", {
  filter: (node) => node.nodeName === "A" && node.getAttribute("href"),
  replacement: (content, node) => {
    const rawHref = node.getAttribute("href");
    const href = mapHref(rawHref);
    let text = content.trim();
    if (!text) return "";
    // 링크 텍스트가 옛 블로그 URL 자체인 경우 새 주소로 표시
    if (href.startsWith("/blog") && /blog\.joshlife\.co\.kr/.test(text)) {
      text = `mkt.joshlife.co.kr${href}`.replace(/_/g, "\\_");
    }
    const trailingBreak = /\n\s*$/.test(content);
    return `[${text}](${href.replace(/\)/g, "%29").replace(/ /g, "%20")})` + (trailingBreak ? "  \n" : "");
  },
});

// ---------- Build ----------

const tagsById = Object.fromEntries(db.tags.map((t) => [t.id, t]));
const metaByPost = Object.fromEntries((db.posts_meta || []).map((m) => [m.post_id, m]));
const tagsByPost = {};
for (const pt of [...db.posts_tags].sort((a, b) => a.sort_order - b.sort_order)) {
  const tag = tagsById[pt.tag_id];
  if (!tag || tag.visibility !== "public") continue;
  (tagsByPost[pt.post_id] ||= []).push(tag.slug);
}

for (const dir of [BLOG_DIR, DRAFT_DIR]) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

const stats = { published: 0, drafts: 0, membersOnly: 0, skippedEmpty: 0 };

for (const post of db.posts) {
  if (post.type !== "post") continue;
  if (!post.html || !post.html.trim()) {
    stats.skippedEmpty++;
    continue;
  }

  const meta = metaByPost[post.id] || {};
  const body = td
    .turndown(post.html)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const isPublic = post.status === "published" && post.visibility === "public";
  const fm = {
    title: post.title,
    date: post.published_at || post.updated_at || post.created_at,
    updated: post.updated_at || undefined,
    tags: tagsByPost[post.id] || [],
    excerpt: post.custom_excerpt || meta.meta_description || undefined,
    cover: post.feature_image ? mapImage(post.feature_image) : undefined,
    coverAlt: meta.feature_image_alt || undefined,
    coverCaption: meta.feature_image_caption
      ? td.turndown(meta.feature_image_caption).trim()
      : undefined,
    featured: post.featured || undefined,
    metaTitle: meta.meta_title || undefined,
    metaDescription: meta.meta_description || undefined,
    ghostStatus: isPublic ? undefined : post.status === "published" ? "members-only" : "draft",
  };
  for (const k of Object.keys(fm)) if (fm[k] === undefined) delete fm[k];

  const file = path.join(isPublic ? BLOG_DIR : DRAFT_DIR, `${post.slug}.md`);
  fs.writeFileSync(file, matter.stringify(`\n${body}\n`, fm));

  if (isPublic) stats.published++;
  else if (post.status === "published") stats.membersOnly++;
  else stats.drafts++;
}

const tags = {};
for (const t of db.tags) {
  if (t.visibility !== "public") continue;
  tags[t.slug] = { name: t.name, description: t.description || "" };
}
fs.writeFileSync(TAGS_PATH, JSON.stringify(tags, null, 2) + "\n");

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n");

console.log(stats);
console.log(`이미지 ${Object.keys(sorted).length}개 → ${path.relative(ROOT, MANIFEST_PATH)}`);
