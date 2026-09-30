/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formatDate, tagName, type PostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border-2 border-olive/10 bg-white/70 transition-all hover:-translate-y-1 hover:border-tangerine hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="aspect-[16/9] overflow-hidden bg-cream-deep">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.coverAlt ?? ""}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">📝</div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {post.tags[0] && (
            <span className="mb-2 text-xs font-bold text-tangerine-deep">
              {tagName(post.tags[0])}
            </span>
          )}
          <h3 className="text-lg leading-snug font-bold text-olive-deep group-hover:underline group-hover:decoration-tangerine group-hover:decoration-2 group-hover:underline-offset-4">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/65">
            {post.excerpt}
          </p>
          <p className="mt-4 text-xs font-medium text-ink/45">
            {formatDate(post.date)} · {post.readingMinutes}분
          </p>
        </div>
      </Link>
    </article>
  );
}
