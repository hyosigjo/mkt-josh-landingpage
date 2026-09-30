import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";

export function TagNav({ active }: { active?: string }) {
  const tags = getAllTags();
  const chip = (isActive: boolean) =>
    `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
      isActive
        ? "bg-olive text-cream"
        : "border-2 border-olive/15 bg-white/60 text-olive hover:border-olive"
    }`;

  return (
    <nav aria-label="주제" className="flex flex-wrap justify-center gap-2">
      <Link href="/blog" className={chip(!active)}>
        전체 <span className="opacity-60">{getAllPosts().length}</span>
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/blog/tag/${tag.slug}`}
          className={chip(active === tag.slug)}
        >
          {tag.name} <span className="opacity-60">{tag.count}</span>
        </Link>
      ))}
    </nav>
  );
}
