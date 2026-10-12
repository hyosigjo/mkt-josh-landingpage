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
  career: "🧭",
  insight: "💭",
  retrospective: "🗓️",
  "field-notes": "☕",
  books: "📚",
  favorite_things: "⚽",
};

const KEYWORDS = [
  "B2B 인바운드",
  "도입상담 전환",
  "메타 광고 · 카피라이팅",
  "세일즈 협업",
  "AI 에이전트 활용",
  "일본 시장",
];

const PROOF = [
  { value: "월 100건", label: "ICP 기업의 도입상담 신청" },
  { value: "40 → 70~100건", label: "인바운드에 광고를 더한 월 상담 신청" },
  { value: "광고 1개 100건", label: "카피 한 줄을 바꾼 광고의 상담 신청" },
];

const PRINCIPLES = [
  {
    title: "리드 수보다 상담 수를 봅니다",
    body: "연락처가 많다는 사실만으로는 아무것도 시작되지 않습니다. 세일즈가 만날 가치가 있는 고객을 데려오는 것이 마케팅의 일입니다.",
    slug: "why-i-dropped-mql",
  },
  {
    title: "광고도 잘해야 합니다",
    body: "고객이 반응할 메시지를 광고 알고리즘과 만나게 하면, 기다리지 않고 직접 고객을 찾아갈 수 있습니다.",
    slug: "marketers-must-master-ads",
  },
  {
    title: "B2B도 결국 사람의 결정입니다",
    body: "불안하고, 지치고, 책임이 두려운 담당자의 마음에서 메시지와 팔로업의 답을 찾습니다.",
    slug: "b2b-decisions-are-emotional",
  },
];

const PROFILE = [
  {
    label: "경력",
    value: "B2B 마케팅 5년",
    detail: "마케팅에서 시작해 세일즈, 사업개발까지 겸직",
  },
  {
    label: "도메인",
    value: "AI · 이커머스 · 글로벌",
    detail: "이커머스·AI B2B 솔루션과 일본 시장 사업",
  },
  {
    label: "언어",
    value: "비즈니스 일본어 · JLPT N1",
    detail: "일본 현지 기업, 일본인 인플루언서와 3개월 이상 미팅과 팔로업을 직접 진행",
  },
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
  const posts = getAllPosts();
  const latest = posts.slice(0, 6);
  const tags = getAllTags();
  const principles = PRINCIPLES.map((p) => ({
    ...p,
    post: posts.find((post) => post.slug === p.slug),
  }));

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
              🚢 B2B 마케터 조쉬
            </span>
            <h1 className="max-w-3xl text-4xl leading-tight font-extrabold text-olive-deep sm:text-5xl md:text-6xl">
              리드가 아니라,
              <br />
              <span className="relative inline-block">
                상담을
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
              </span>{" "}
              만듭니다
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">
              세일즈가 꼭 만나야 할 고객을 데려오는 마케터입니다.
              <br className="hidden sm:block" /> 콘텐츠와 광고로 도입상담
              신청을 월 100건까지 만들었고, 때로는 직접 계약서에 도장을
              받았습니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#about">일하는 방식 보기 →</CTAButton>
              <CTAButton href="#contact" variant="secondary">
                연락하기
              </CTAButton>
            </div>
            <dl className="mt-12 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
              {PROOF.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border-2 border-olive/10 bg-white/70 px-5 py-4"
                >
                  <dt className="text-2xl font-extrabold text-olive-deep">
                    {item.value}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink/60">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm font-medium text-ink/50">
              B2B 마케팅 5년 · AI · 이커머스 · 글로벌 · 비즈니스 일본어(JLPT N1)
            </p>
          </div>
        </section>

        {/* ===== About ===== */}
        <section id="about" className="scroll-mt-16 bg-olive py-20 text-cream">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
              <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-cream md:h-52 md:w-52">
                <LogoMark className="h-32 w-32 md:h-36 md:w-36" />
              </div>
              <div>
                <span className="mb-3 inline-block rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-olive-deep">
                  About
                </span>
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  패스만 하던 마케터에서,
                  <br />
                  골을 넣는 마케터로
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/85">
                  오랫동안 마케팅은 좋은 패스를 하는 일이라고 생각했습니다.
                  리드를 모아 “저희 영업팀을 연결해 드릴게요”라고 넘기는
                  것까지가 제 역할이었죠.
                </p>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/85">
                  그런데 마케팅과 세일즈를 겸직하며 직접 견적서를 쓰고 계약서에
                  도장을 받아본 날, 생각이 바뀌었습니다. 그 뒤로 제 마케팅은
                  ‘점유’가 아니라 ‘승리’를 향합니다.{" "}
                  <Link
                    href="/blog/be-the-striker"
                    className="font-bold whitespace-nowrap text-lime hover:underline"
                  >
                    그날의 이야기 →
                  </Link>
                </p>
              </div>
            </div>

            <h3 className="mt-16 text-xl font-extrabold text-lime">
              이렇게 일합니다
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col rounded-3xl border-2 border-cream/15 bg-cream/5 p-6"
                >
                  <p className="text-lg font-bold">{p.title}</p>
                  <p className="mt-2 flex-1 leading-relaxed text-cream/75">
                    {p.body}
                  </p>
                  {p.post && (
                    <Link
                      href={`/blog/${p.post.slug}`}
                      className="mt-4 text-sm font-bold text-lime hover:underline"
                    >
                      글 읽기: {p.post.title} →
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <dl className="mt-10 grid gap-4 border-t-2 border-cream/15 pt-10 md:grid-cols-3">
              {PROFILE.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-bold text-lime">{item.label}</dt>
                  <dd className="mt-1">
                    <span className="block text-lg font-bold">{item.value}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-cream/70">
                      {item.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-10 flex flex-wrap gap-2">
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
