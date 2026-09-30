import { getAllPosts, getPost } from "@/lib/blog";

export const dynamic = "force-static";

const SITE = "https://mkt.joshlife.co.kr";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// 상대 경로(/blog/images/...)를 RSS 리더가 읽을 수 있도록 절대 경로로
const absolutize = (html: string) =>
  html.replace(/(src|href)="\/(?!\/)/g, `$1="${SITE}/`);

export function GET() {
  const items = getAllPosts()
    .slice(0, 30)
    .map((meta) => {
      const post = getPost(meta.slug)!;
      const url = `${SITE}/blog/${post.slug}`;
      return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.excerpt)}</description>
      <content:encoded><![CDATA[${absolutize(post.html).replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>마케터 조쉬</title>
    <link>${SITE}/blog</link>
    <description>마케터로 일하며 배우고 느낀 것들을 기록합니다.</description>
    <language>ko</language>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
