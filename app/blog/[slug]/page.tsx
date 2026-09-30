/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPost, tagName } from "@/lib/blog";
import { PostCard } from "../../components/PostCard";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const description = post.metaDescription ?? post.excerpt;
  return {
    title: post.metaTitle ?? post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle ?? post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags.map(tagName),
      images: [post.cover ?? "/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle ?? post.title,
      description,
      images: [post.cover ?? "/og-image.jpg"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === post.slug);
  const newer = all[index - 1];
  const older = all[index + 1];
  const related = all
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: "마케터 조쉬" },
    ...(post.cover ? { image: `https://mkt.joshlife.co.kr${post.cover}` } : {}),
    mainEntityOfPage: `https://mkt.joshlife.co.kr/blog/${post.slug}`,
  };

  return (
    <>
      <SiteHeader />
      <main className="px-5 py-14 sm:py-20">
        <article className="mx-auto max-w-3xl">
          <header className="mb-10 text-center">
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog/tag/${t}`}
                  className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-olive-deep hover:bg-lime-soft"
                >
                  {tagName(t)}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl leading-tight font-extrabold text-olive-deep sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm font-medium text-ink/50">
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {post.readingMinutes}분 읽기
            </p>
          </header>

          {post.cover && (
            <figure className="mb-12">
              <img
                src={post.cover}
                alt={post.coverAlt ?? ""}
                className="w-full rounded-3xl border-2 border-olive/10"
              />
              {post.coverCaption && (
                <figcaption className="mt-3 text-center text-sm text-ink/50">
                  {post.coverCaption}
                </figcaption>
              )}
            </figure>
          )}

          <div
            className="post-body prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <nav className="mt-16 grid gap-4 border-t-2 border-olive/10 pt-8 sm:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="rounded-2xl border-2 border-olive/10 bg-white/60 p-5 transition-colors hover:border-tangerine"
              >
                <span className="text-xs font-bold text-ink/45">← 이전 글</span>
                <p className="mt-1 font-bold text-olive-deep">{older.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="rounded-2xl border-2 border-olive/10 bg-white/60 p-5 text-right transition-colors hover:border-tangerine"
              >
                <span className="text-xs font-bold text-ink/45">다음 글 →</span>
                <p className="mt-1 font-bold text-olive-deep">{newer.title}</p>
              </Link>
            )}
          </nav>

          <aside className="mt-10 rounded-3xl bg-olive px-7 py-8 text-center text-cream">
            <p className="text-lg font-bold">이 글에 대해 이야기 나누고 싶다면</p>
            <p className="mt-1 text-cream/75">
              커피챗, 협업 제안, 사소한 질문도 모두 환영해요.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex rounded-full bg-lime px-6 py-3 text-sm font-bold text-olive-deep transition-colors hover:bg-lime-soft"
            >
              조쉬에게 연락하기 →
            </Link>
          </aside>
        </article>

        {related.length > 0 && (
          <section className="mx-auto mt-20 max-w-6xl">
            <h2 className="mb-6 text-center text-2xl font-extrabold text-olive-deep">
              함께 읽으면 좋은 글
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
