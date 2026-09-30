import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllTags, getTag } from "@/lib/blog";
import { PostCard } from "../../../components/PostCard";
import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import { TagNav } from "../../../components/TagNav";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = getTag((await params).tag);
  if (!tag) return {};
  return {
    title: `${tag.name} — 글`,
    description: tag.description || `마케터 조쉬의 '${tag.name}' 글 모음`,
    alternates: { canonical: `/blog/tag/${tag.slug}` },
  };
}

export default async function TagPage({ params }: Props) {
  const tag = getTag((await params).tag);
  if (!tag) notFound();
  const posts = getAllPosts().filter((p) => p.tags.includes(tag.slug));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-olive-deep">
            주제
          </span>
          <h1 className="text-3xl font-extrabold text-olive-deep sm:text-4xl">
            {tag.name}
          </h1>
          {tag.description && (
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              {tag.description}
            </p>
          )}
        </div>
        <TagNav active={tag.slug} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
