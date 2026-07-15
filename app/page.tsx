import { Logo, LogoMark } from "./components/Logo";
import { ContactForm } from "./components/ContactForm";

const CONTACT_EMAIL = "hyosigjo18@gmail.com";
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "[마케터 조쉬] 상담 문의"
)}`;

const NAV_ITEMS = [
  { label: "서비스", href: "#services" },
  { label: "진행 방식", href: "#process" },
  { label: "플랜", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];

const PAINS = [
  {
    emoji: "🧭",
    title: "무엇부터 해야 할지 모르겠어요",
    body: "제품은 만들었는데 마케팅은 처음이라, 채널도 메시지도 우선순위가 잡히지 않습니다.",
  },
  {
    emoji: "📭",
    title: "문의가 들어오지 않아요",
    body: "광고도 돌려보고 콘텐츠도 올려봤지만, 정작 상담 문의로 이어지는 흐름이 없습니다.",
  },
  {
    emoji: "⏳",
    title: "마케터를 뽑기엔 이르고, 대행사는 부담돼요",
    body: "풀타임 채용은 이르고, 큰 대행사는 초기 팀의 속도와 예산에 맞지 않습니다.",
  },
];

const SERVICES = [
  {
    emoji: "💬",
    title: "핵심 메시지 발굴",
    body: "고객 인터뷰와 시장 조사를 바탕으로, 우리 제품이 '누구의 어떤 문제'를 푸는지 한 문장으로 정리합니다.",
  },
  {
    emoji: "🛬",
    title: "랜딩페이지 세팅",
    body: "발굴한 메시지가 전환으로 이어지도록, 문의·리드 수집 중심의 랜딩페이지를 설계하고 세팅합니다.",
  },
  {
    emoji: "🔍",
    title: "블로그 SEO",
    body: "잠재 고객이 검색하는 키워드를 찾아, 꾸준히 유입을 만드는 블로그 콘텐츠 구조를 만듭니다.",
  },
  {
    emoji: "📸",
    title: "인스타그램",
    body: "브랜드의 톤을 지키면서 신뢰를 쌓는 콘텐츠 운영 체계를 잡아드립니다.",
  },
  {
    emoji: "📣",
    title: "메타 광고",
    body: "타겟·소재·예산을 작게 실험하고, 검증된 조합에 집중하는 퍼포먼스 운영을 합니다.",
  },
  {
    emoji: "✉️",
    title: "아웃바운드",
    body: "인바운드가 쌓이는 동안, 핵심 타겟에게 직접 닿는 콜드 메일·DM 시퀀스를 설계합니다.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "진단",
    body: "현재 제품, 고객, 채널 현황을 함께 살펴보고 병목이 어디인지 찾습니다.",
  },
  {
    step: "02",
    title: "메시지 · 퍼널 설계",
    body: "핵심 메시지를 정리하고, 유입부터 문의까지 이어지는 퍼널 구조를 설계합니다.",
  },
  {
    step: "03",
    title: "채널 실행",
    body: "랜딩페이지, SEO, 광고, 아웃바운드 중 지금 단계에 맞는 채널부터 실행합니다.",
  },
  {
    step: "04",
    title: "측정 · 개선",
    body: "숫자로 확인하고, 되는 것에 집중하고, 안 되는 것은 빠르게 접습니다.",
  },
];

const PLANS = [
  {
    name: "알려줘쉬",
    tagline: "자문 & Q&A",
    description:
      "방향이 막막할 때, 물어보면 답해드립니다. 마케팅 고민에 대한 자문과 간단한 질문 답변.",
    features: ["1:1 자문 미팅", "마케팅 전략 Q&A", "채널·우선순위 진단", "실행 가이드 제안"],
    cta: "자문 신청하기",
    highlight: false,
  },
  {
    name: "도와줘쉬",
    tagline: "세팅 보조",
    description:
      "혼자 하기 어려운 첫 세팅을 함께합니다. 랜딩페이지, 광고 계정, 분석 도구까지.",
    features: [
      "핵심 메시지 정리",
      "랜딩페이지 세팅",
      "광고 계정 · 픽셀 세팅",
      "운영 가이드 전달",
    ],
    cta: "세팅 문의하기",
    highlight: false,
  },
  {
    name: "해줘쉬",
    tagline: "B2B 마케팅 실행",
    description:
      "일정 기간 이상, 인바운드 퍼널 구축부터 채널 운영까지 마케터 조쉬가 직접 실행합니다.",
    features: [
      "인바운드 퍼널 구축",
      "블로그 SEO · 콘텐츠 운영",
      "메타 광고 운영",
      "아웃바운드 시퀀스",
      "월간 리포트 · 개선",
    ],
    cta: "프로젝트 문의하기",
    highlight: true,
  },
  {
    name: "그냥 해",
    tagline: "엔터프라이즈",
    description:
      "묻지도 따지지도 말고, 전체 퍼널을 통째로. 목표만 주시면 전략부터 실행까지 책임집니다.",
    features: [
      "해줘쉬의 모든 것",
      "마케팅 전략 총괄",
      "전 채널 통합 운영",
      "주간 싱크 · 우선 대응",
    ],
    cta: "그냥 맡기기",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "어떤 회사와 잘 맞나요?",
    a: "이제 막 고객을 만나기 시작한 초기 단계의 B2B 비즈니스와 가장 잘 맞습니다. 특히 이커머스·AI·SaaS 도메인이라면 그동안의 경험을 바로 활용할 수 있습니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "플랜과 범위에 따라 달라집니다. 먼저 무료 상담으로 현재 상황을 들어본 뒤, 지금 단계에 필요한 만큼만 제안드립니다.",
  },
  {
    q: "최소 계약 기간이 있나요?",
    a: "알려줘쉬·도와줘쉬는 단건으로 진행할 수 있습니다. 해줘쉬는 퍼널이 자리 잡는 데 필요한 최소 기간(보통 3개월)을 권장드립니다.",
  },
  {
    q: "어디까지 직접 해주시나요?",
    a: "플랜에 따라 다릅니다. 알려줘쉬는 방향을 알려드리고, 도와줘쉬는 세팅을 함께하고, 해줘쉬부터는 실행까지 직접 합니다. 그냥 해는 말 그대로, 그냥 다 합니다.",
  },
];

function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "lime";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-olive text-cream hover:bg-olive-deep shadow-[0_4px_0_0_var(--color-olive-deep)] hover:shadow-none hover:translate-y-1",
    secondary:
      "bg-transparent text-olive border-2 border-olive hover:bg-olive hover:text-cream",
    lime: "bg-lime text-olive-deep hover:bg-lime-soft shadow-[0_4px_0_0_var(--color-olive-deep)] hover:shadow-none hover:translate-y-1",
  }[variant];

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition-all duration-150 ${styles} ${className}`}
    >
      {children}
    </a>
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
  return (
    <>
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 border-b border-olive/10 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" aria-label="마케터 조쉬 홈">
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="주요 메뉴">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-ink/70 transition-colors hover:text-olive-deep"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-olive px-5 py-2 text-sm font-bold text-cream transition-colors hover:bg-olive-deep"
          >
            상담하기
          </a>
        </div>
      </header>

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
              🚢 초기 B2B 비즈니스의 마케팅 파트너
            </span>
            <h1 className="max-w-3xl text-4xl leading-tight font-extrabold text-olive-deep sm:text-5xl md:text-6xl">
              좋은 제품이
              <br />
              먼저 <span className="relative inline-block">
                발견되도록
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
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/75 sm:text-xl">
              B2B 인바운드 퍼널 구축, 마케터 조쉬가 함께합니다.{" "}
              <br className="hidden sm:block" />
              핵심 메시지 발굴부터 랜딩페이지, SEO, 광고, 아웃바운드까지 —
              문의가 들어오는 구조를 만듭니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#contact">무료로 상담하기 →</CTAButton>
              <CTAButton href="#plans" variant="secondary">
                플랜 살펴보기
              </CTAButton>
            </div>
            <p className="mt-6 text-sm font-medium text-ink/50">
              이커머스 · AI 도메인 5년+ B2B 마케팅 경력
            </p>
          </div>
        </section>

        {/* ===== Pain points ===== */}
        <section className="bg-white/50 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="이런 고민, 있으신가요?"
              title="초기 팀의 마케팅은 늘 비슷한 곳에서 막힙니다"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {PAINS.map((pain) => (
                <div
                  key={pain.title}
                  className="rounded-3xl border-2 border-olive/10 bg-cream p-8"
                >
                  <span className="text-4xl">{pain.emoji}</span>
                  <h3 className="mt-4 text-xl font-bold text-olive-deep">
                    {pain.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{pain.body}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed font-semibold text-olive">
              마케터 조쉬는 이 고민을 <u className="decoration-tangerine decoration-4 underline-offset-4">‘인바운드 퍼널’</u>로 풉니다.
              <br />
              고객이 우리를 발견하고, 신뢰하고, 문의하게 되는 구조를 함께 만듭니다.
            </p>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="핵심 서비스"
              title="B2B 인바운드 퍼널 구축"
              description="메시지부터 채널까지, 문의가 들어오는 흐름 전체를 설계하고 실행합니다."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-3xl border-2 border-olive/10 bg-white/70 p-8 transition-all hover:-translate-y-1 hover:border-tangerine hover:shadow-lg"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-deep text-2xl">
                    {service.emoji}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-olive-deep">
                    {service.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/70">
                    {service.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <section className="bg-olive py-20 text-cream">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[auto_1fr]">
            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-cream md:h-52 md:w-52">
              <LogoMark className="h-32 w-32 md:h-36 md:w-36" />
            </div>
            <div>
              <span className="mb-3 inline-block rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-olive-deep">
                안녕하세요, 마케터 조쉬입니다
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                초기 비즈니스의 고민을
                <br />
                함께 푸는 마케터
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
                5년 이상 이커머스와 AI 도메인에서 B2B 마케팅을 해왔습니다.
                리드가 없던 제품에 인바운드 퍼널을 만들고, 검색과 콘텐츠로
                꾸준히 문의가 쌓이는 구조를 만드는 일을 가장 잘합니다.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/85">
                큰 대행사의 속도가 아니라, 같은 팀처럼 움직이는 파트너가
                필요하다면 — 지금이 인사할 타이밍입니다.
              </p>
            </div>
          </div>
        </section>

        {/* ===== Process ===== */}
        <section id="process" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="진행 방식"
              title="작게 실험하고, 되는 것에 집중합니다"
            />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <li
                  key={step.step}
                  className="rounded-3xl bg-white/70 p-8 shadow-sm"
                >
                  <span className="text-3xl font-extrabold text-tangerine">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-olive-deep">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== Plans ===== */}
        <section id="plans" className="scroll-mt-20 bg-cream-deep/50 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="플랜"
              title="필요한 만큼만, 조쉬에게"
              description="가볍게 물어보는 것부터 통째로 맡기는 것까지. 지금 단계에 맞는 플랜을 고르세요."
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl p-8 ${
                    plan.highlight
                      ? "border-[3px] border-olive bg-lime shadow-xl"
                      : "border-2 border-olive/10 bg-white/80"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-olive px-4 py-1.5 text-xs font-bold whitespace-nowrap text-cream">
                      ⭐ 가장 많이 찾는 플랜
                    </span>
                  )}
                  <p
                    className={`text-sm font-bold ${
                      plan.highlight ? "text-olive" : "text-tangerine-deep"
                    }`}
                  >
                    {plan.tagline}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold text-olive-deep">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {plan.description}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm font-medium text-ink/80"
                      >
                        <span className="mt-0.5 text-olive">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      plan.highlight
                        ? "bg-olive text-cream hover:bg-olive-deep"
                        : "border-2 border-olive text-olive hover:bg-olive hover:text-cream"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-ink/50">
              비용은 범위에 따라 달라집니다. 무료 상담 후 지금 단계에 필요한
              만큼만 제안드립니다.
            </p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-3xl px-5">
            <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border-2 border-olive/10 bg-white/70 px-6 py-5 open:border-tangerine"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-olive-deep [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="text-tangerine transition-transform group-open:rotate-45">
                      ＋
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="scroll-mt-20 px-5 pb-24">
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
                  무료 상담
                </span>
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  지금 겪는 마케팅 고민,
                  <br />
                  일단 조쉬에게 물어보세요
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/80">
                  첫 상담은 무료입니다. 현재 상황을 들려주시면, 지금 단계에서
                  무엇부터 하면 좋을지 솔직하게 말씀드립니다.
                </p>
                <p className="mt-8 text-sm text-cream/60">
                  폼이 어렵다면 이메일로 직접 보내주세요
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

      {/* ===== Footer ===== */}
      <footer className="border-t border-olive/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
          <Logo />
          <p className="text-sm text-ink/50">
            © {new Date().getFullYear()} Marketer Josh · B2B 인바운드 퍼널 구축
          </p>
          <a
            href={CONTACT_HREF}
            className="text-sm font-semibold text-olive hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </footer>
    </>
  );
}
