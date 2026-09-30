import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "../components/PostCard";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { TagNav } from "../components/TagNav";

export const metadata: Metadata = {
  title: "글",
  description:
    "마케터로 일하며 배우고 느낀 것들을 기록합니다. 마케팅 지식, 커리어, 책 읽기, 그리고 조쉬의 생각.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-lime px-4 py-1.5 text-sm font-bold text-olive-deep">
            조쉬의 기록
          </span>
          <h1 className="text-3xl font-extrabold text-olive-deep sm:text-4xl">
            일하며 배운 것들을 씁니다
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            마케팅 지식부터 커리어 고민, 읽은 책과 좋아하는 것들까지.
          </p>
        </div>
        <TagNav />
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
