import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts, tagName } from "@/lib/blog";

// 빌드할 때 글마다 한 번 그려서 정적 PNG로 저장합니다 (커버 없는 글의 기본 썸네일)
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const WIDTH = 1200;
const HEIGHT = 675;

type Theme = { bg: string; fg: string; blob: string; pillBg: string; pillFg: string };

const THEMES: Record<string, Theme> = {
  marketing: { bg: "#44521d", fg: "#fbf1dc", blob: "#ddfa71", pillBg: "#ddfa71", pillFg: "#333f14" },
  career: { bg: "#ffb606", fg: "#333f14", blob: "#fbf1dc", pillBg: "#333f14", pillFg: "#fbf1dc" },
  insight: { bg: "#333f14", fg: "#fbf1dc", blob: "#ffb606", pillBg: "#ffb606", pillFg: "#333f14" },
  retrospective: { bg: "#f5e6c4", fg: "#333f14", blob: "#ffb606", pillBg: "#44521d", pillFg: "#fbf1dc" },
  "field-notes": { bg: "#fbf1dc", fg: "#333f14", blob: "#ddfa71", pillBg: "#ffb606", pillFg: "#333f14" },
  books: { bg: "#ddfa71", fg: "#333f14", blob: "#fbf1dc", pillBg: "#44521d", pillFg: "#ddfa71" },
  favorite_things: { bg: "#9e6c0a", fg: "#fbf1dc", blob: "#ffb606", pillBg: "#fbf1dc", pillFg: "#9e6c0a" },
};
const DEFAULT_THEME = THEMES["field-notes"];

const fontDir = path.join(process.cwd(), "assets/fonts");
const fonts = [
  { name: "Pretendard", data: fs.readFileSync(path.join(fontDir, "Pretendard-SemiBold.otf")), weight: 600 as const },
  { name: "Pretendard", data: fs.readFileSync(path.join(fontDir, "Pretendard-ExtraBold.otf")), weight: 800 as const },
];
const symbol = `data:image/svg+xml;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/logo-symbol.svg"))
  .toString("base64")}`;

const blob = (color: string, d: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><path fill="${color}" d="${d}"/></svg>`
  ).toString("base64")}`;
const TOP_BLOB = "M-40,-40 L320,-40 C280,40 240,60 220,120 C200,180 120,200 40,190 C-10,183 -40,140 -40,80 Z";
const BOTTOM_BLOB = "M440,340 L80,340 C120,260 160,240 180,180 C200,120 280,100 360,110 C410,117 440,160 440,220 Z";

const EMOJI = /[\p{Extended_Pictographic}️‍]/gu;

/** "이커머스 스터디 ①: 구조의 이해" → 위 작은 줄 + 큰 제목, "메시지 <책>" → 큰 제목 + 아래 책 제목 */
function splitTitle(raw: string) {
  const title = raw.replace(EMOJI, "").replace(/\s+/g, " ").trim();
  const book = title.match(/^(.*?)\s*(<[^>]+>)$/);
  if (book && book[1]) return { kicker: "", main: book[1], sub: book[2] };
  const colon = title.indexOf(": ");
  if (colon > 0 && colon <= 22) return { kicker: title.slice(0, colon), main: title.slice(colon + 2), sub: "" };
  return { kicker: "", main: title, sub: "" };
}

function mainSize(text: string) {
  if (text.length <= 14) return 84;
  if (text.length <= 24) return 72;
  if (text.length <= 36) return 62;
  return 54;
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return new Response("Not found", { status: 404 });

  const category = post.tags[0];
  const theme = (category && THEMES[category]) || DEFAULT_THEME;
  const { kicker, main, sub } = splitTitle(post.title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: theme.bg,
          color: theme.fg,
          fontFamily: "Pretendard",
          padding: "64px 80px 60px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blob(theme.blob, TOP_BLOB)}
          width={520}
          height={390}
          style={{ position: "absolute", top: -150, right: -170, opacity: 0.9, transform: "scaleX(-1)" }}
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blob(theme.blob, BOTTOM_BLOB)}
          width={460}
          height={345}
          style={{ position: "absolute", bottom: -170, left: -200, opacity: 0.55, transform: "scaleX(-1)" }}
          alt=""
        />

        <div style={{ display: "flex" }}>
          {category && (
            <div
              style={{
                display: "flex",
                backgroundColor: theme.pillBg,
                color: theme.pillFg,
                fontSize: 28,
                fontWeight: 600,
                padding: "10px 26px",
                borderRadius: 999,
              }}
            >
              {tagName(category)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          {kicker && (
            <div style={{ display: "flex", fontSize: 34, fontWeight: 600, opacity: 0.8, marginBottom: 14 }}>
              {kicker}
            </div>
          )}
          {/* 단어 단위로만 줄바꿈 (문장부호가 혼자 다음 줄로 넘어가지 않게) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: mainSize(main),
              fontWeight: 800,
              lineHeight: 1.28,
              letterSpacing: "-0.02em",
            }}
          >
            {main.split(" ").map((word, i) => (
              <span key={i} style={{ marginRight: "0.26em", whiteSpace: "nowrap" }}>
                {word}
              </span>
            ))}
          </div>
          {sub && (
            <div style={{ display: "flex", fontSize: 32, fontWeight: 600, opacity: 0.8, marginTop: 18 }}>
              {sub}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, opacity: 0.85, marginRight: 18 }}>
            마케터 조쉬
          </div>
          <div
            style={{
              display: "flex",
              width: 76,
              height: 76,
              borderRadius: 999,
              backgroundColor: "#fbf1dc",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={symbol} width={52} height={62} alt="" />
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts }
  );
}
