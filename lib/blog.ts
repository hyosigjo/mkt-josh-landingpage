import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import tagsJson from "@/content/tags.json";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  coverAlt?: string;
  coverCaption?: string;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

export interface TagInfo {
  slug: string;
  name: string;
  description: string;
  count: number;
}

const TAGS: Record<string, { name: string; description: string }> = tagsJson;

function plainText(markdown: string) {
  return markdown
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readPostFile(slug: string): { meta: PostMeta; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const text = plainText(content);
  const toISO = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v ?? ""));

  return {
    content,
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: toISO(data.date),
      updated: data.updated ? toISO(data.updated) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      excerpt: data.excerpt ? String(data.excerpt) : text.slice(0, 140) + (text.length > 140 ? "…" : ""),
      cover: data.cover || undefined,
      coverAlt: data.coverAlt || undefined,
      coverCaption: data.coverCaption || undefined,
      featured: Boolean(data.featured),
      metaTitle: data.metaTitle || undefined,
      metaDescription: data.metaDescription || undefined,
      // 한국어 기준 분당 약 500자
      readingMinutes: Math.max(1, Math.round(text.length / 500)),
    },
  };
}

let cache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
  cache = slugs
    .map((slug) => readPostFile(slug)!.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export function getPost(slug: string): Post | null {
  const found = readPostFile(slug);
  if (!found) return null;
  return { ...found.meta, html: renderMarkdown(found.content) };
}

export function getTag(slug: string): TagInfo | null {
  const count = getAllPosts().filter((p) => p.tags.includes(slug)).length;
  if (!count && !TAGS[slug]) return null;
  return {
    slug,
    name: TAGS[slug]?.name ?? slug,
    description: TAGS[slug]?.description ?? "",
    count,
  };
}

export function getAllTags(): TagInfo[] {
  const slugs = new Set(getAllPosts().flatMap((p) => p.tags));
  return [...slugs]
    .map((s) => getTag(s)!)
    .sort((a, b) => b.count - a.count);
}

export function tagName(slug: string) {
  return TAGS[slug]?.name ?? slug;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

// ---------- Markdown ----------

const EMOJI_START = /^\s*(\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic}|\p{Emoji_Modifier})*)\s*/u;

const marked = new Marked({ gfm: true, breaks: false });

marked.use({
  renderer: {
    // "> 💡 내용" 처럼 이모지로 시작하는 인용문은 콜아웃 박스로 표시
    blockquote(this: { parser: { parse: (t: Tokens.Generic[]) => string } }, token: Tokens.Blockquote) {
      const body = this.parser.parse(token.tokens);
      const firstText = token.text ?? "";
      const m = firstText.match(EMOJI_START);
      if (!m) return `<blockquote>${body}</blockquote>\n`;
      const withoutEmoji = body.replace(m[1], "").replace(/^(<p>)\s+/, "$1");
      return `<aside class="callout"><span class="callout-emoji" aria-hidden="true">${m[1]}</span><div class="callout-body">${withoutEmoji}</div></aside>\n`;
    },
    image({ href, title, text }: Tokens.Image) {
      const t = title ? ` title="${title}"` : "";
      return `<img src="${href}" alt="${text}"${t} loading="lazy" decoding="async">`;
    },
    link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
      const inner = this.parser.parseInline(tokens);
      const t = title ? ` title="${title}"` : "";
      const external = /^https?:\/\//.test(href);
      return `<a href="${href}"${t}${external ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>`;
    },
  },
});

export function renderMarkdown(markdown: string) {
  return marked.parse(markdown, { async: false }) as string;
}
