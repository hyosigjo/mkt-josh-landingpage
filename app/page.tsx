import Link from "next/link";
import { LogoMark } from "./components/Logo";
import { ContactForm } from "./components/ContactForm";
import { PostCard } from "./components/PostCard";
import {
  CONTACT_EMAIL,
  CONTACT_HREF,
  SiteFooter,
  SiteHeader,
} from "./components/SiteChrome";
import { getAllPosts, getAllTags } from "@/lib/blog";

const TAG_EMOJI: Record<string, string> = {
  marketing: "📈",
  insight: "💭",
  career: "🧭",
  books: "📚",
  favorite_things: "⚽",
  skincare: "🧴",
};

const KEYWORDS = [
  "B2B 마케팅",
  "인바운드 퍼널",
  "CRM · 세일즈",
  "콘텐츠 · SEO",
  "커리어 멘토링",
];

function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles = {
    primary:
      "bg-olive text-cream hover:bg-olive-deep shadow-[0_4px_0_0_var(--color-olive-deep)] hover:shadow-none hover:translate-y-1",
    secondary:
      "bg-transparent text-olive border-2 border-olive hover:bg-olive hover:text-cream",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition-all duration-150 ${styles}`}
    >
      {children}
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="mb-3 inline-block rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-olive-deep">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold text-olive-deep sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-ink/70">{description}</p>
      )}
    </div>
  );
}

export default function Home() {
  const latest = getAllPosts().slice(0, 6);
  const tags = getAllTags();

  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <svg
              className="absolute -top-24 -left-24 h-[28rem] w-[36rem] text-tangerine opacity-90"
              viewBox="0 0 400 300"
              fill="currentColor"
            >
              <path d="M-40,-40 L320,-40 C280,40 240,60 220,120 C200,180 120,200 40,190 C-10,183 -40,140 -40,80 Z" />
            </svg>
            <svg
              className="absolute -right-28 -bottom-32 h-[26rem] w-[34rem] text-lime"
              viewBox="0 0 400 300"
              fill="currentColor"
            >
              <path d="M440,340 L80,340 C120,260 160,240 180,180 C200,120 280,100 360,110 C410,117 440,160 440,220 Z" />
            </svg>
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pt-24 pb-28 text-center sm:pt-32">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-olive/15 bg-white/60 px-5 py-2 text-sm font-bold text-olive">
              🚢 안녕하세요, 마케터 조쉬입니다
            </span>
            <h1 className="max-w-3xl text-4xl leading-tight font-extrabold text-olive-deep sm:text-5xl md:text-6xl">
              콘텐츠로{" "}
              <span className="relative inline-block">
                고객을 돕는
                <svg
                  className="absolute -bottom-2 left-0 w-full text-tangerine"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9 C60 3, 140 3, 197 8"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              마케터
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/75 sm:text-xl">
              스타트업에서 마케터로 일하면서 느낀 점과 지식, 경험을 기록하고
              나눕니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/blog">글 읽으러 가기 →</CTAButton>
              <CTAButton href="#contact" variant="secondary">
                연락하기
              </CTAButton>
            </div>
            <p className="mt-6 text-sm font-medium text-ink/50">
              이커머스 · AI 도메인 5년+ B2B 마케팅
            </p>
          </div>
        </section>

        {/* ===== About ===== */}
        <section id="about" className="scroll-mt-16 bg-olive py-20 text-cream">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[auto_1fr]">
            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-cream md:h-52 md:w-52">
              <LogoMark className="h-32 w-32 md:h-36 md:w-36" />
            </div>
            <div>
              <span className="mb-3 inline-block rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-olive-deep">
                About
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                좋은 제품이 먼저
                <br />
                발견되도록 돕는 마케터
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
                5년 넘게 이커머스와 AI 도메인에서 B2B 마케팅을 해왔습니다.
                리드가 없던 제품에 인바운드 퍼널을 만들고, 검색과 콘텐츠로
                꾸준히 문의가 쌓이는 구조를 만드는 일을 가장 좋아합니다.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/85">
                일하며 배운 것들은 블로그에 기록하고, 먼저 걸어본 길은 주니어
                마케터들과 나누고 있어요.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {KEYWORDS.map((k) => (
                  <li
                    key={k}
                    className="rounded-full border-2 border-cream/25 px-4 py-1.5 text-sm font-bold text-cream/90"
                  >
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== Topics ===== */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="무엇을 쓰나요?"
              title="이런 이야기를 기록합니다"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="group flex items-center gap-4 rounded-3xl border-2 border-olive/10 bg-white/70 p-6 transition-all hover:-translate-y-1 hover:border-tangerine hover:shadow-lg"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream-deep text-2xl">
                    {TAG_EMOJI[tag.slug] ?? "✏️"}
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-bold text-olive-deep">
                      {tag.name}
                    </span>
                    <span className="text-sm text-ink/55">
                      글 {tag.count}개
                    </span>
                  </span>
                  <span className="text-tangerine-deep transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Latest posts ===== */}
        <section className="bg-white/50 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="최근 글" title="요즘 조쉬의 생각" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <CTAButton href="/blog" variant="secondary">
                전체 글 보기 →
              </CTAButton>
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="scroll-mt-20 px-5 py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-olive px-6 py-12 text-cream sm:px-12 sm:py-16">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 text-lime/25"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <circle cx="100" cy="100" r="100" />
            </svg>
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-olive-deep">
                  연락하기
                </span>
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  함께 이야기 나눠요
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/80">
                  커피챗, 협업 제안, 글에 대한 의견까지 — 어떤 이야기든
                  반가워요. 편하게 남겨주시면 답장드릴게요.
                </p>
                <p className="mt-8 text-sm text-cream/60">
                  이메일로 직접 보내셔도 좋아요
                  <br />
                  <a
                    href={CONTACT_HREF}
                    className="mt-1 inline-block text-base font-bold text-lime hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
