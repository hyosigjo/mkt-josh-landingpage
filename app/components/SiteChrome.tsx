import Link from "next/link";
import { Logo } from "./Logo";

export const CONTACT_EMAIL = "hyosigjo18@gmail.com";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "[마케터 조쉬] 안녕하세요"
)}`;

const NAV_ITEMS = [
  { label: "소개", href: "/#about" },
  { label: "글", href: "/blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-olive/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="마케터 조쉬 홈">
          <Logo />
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="flex items-center gap-6 sm:gap-8" aria-label="주요 메뉴">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-ink/70 transition-colors hover:text-olive-deep"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#contact"
            className="rounded-full bg-olive px-5 py-2 text-sm font-bold text-cream transition-colors hover:bg-olive-deep"
          >
            연락하기
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-olive/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
        <Logo />
        <p className="text-sm text-ink/50">
          © {new Date().getFullYear()} Marketer Josh
        </p>
        <div className="flex items-center gap-5 text-sm font-semibold text-olive">
          <Link href="/blog" className="hover:underline">
            글
          </Link>
          <a href="/blog/rss.xml" className="hover:underline">
            RSS
          </a>
          <a href={CONTACT_HREF} className="hover:underline">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
