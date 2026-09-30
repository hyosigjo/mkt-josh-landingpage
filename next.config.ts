import type { NextConfig } from "next";

const SITE = "https://mkt.joshlife.co.kr";
const OLD_BLOG_HOST = [{ type: "host" as const, value: "blog.joshlife.co.kr" }];

const nextConfig: NextConfig = {
  // 옛 Ghost 블로그(blog.joshlife.co.kr)를 이 프로젝트에 도메인으로 연결하면
  // 기존 글·태그·이미지 주소가 새 주소로 영구 이동(308)되어 검색 순위와 외부 링크가 유지됩니다.
  async redirects() {
    return [
      { source: "/", has: OLD_BLOG_HOST, destination: `${SITE}/blog`, permanent: true },
      { source: "/rss", has: OLD_BLOG_HOST, destination: `${SITE}/blog/rss.xml`, permanent: true },
      { source: "/sitemap.xml", has: OLD_BLOG_HOST, destination: `${SITE}/sitemap.xml`, permanent: true },
      { source: "/tag/:tag", has: OLD_BLOG_HOST, destination: `${SITE}/blog/tag/:tag`, permanent: true },
      {
        source: "/content/images/size/:size/:path*",
        has: OLD_BLOG_HOST,
        destination: `${SITE}/blog/images/:path*`,
        permanent: true,
      },
      {
        source: "/content/images/:path*",
        has: OLD_BLOG_HOST,
        destination: `${SITE}/blog/images/:path*`,
        permanent: true,
      },
      { source: "/author/:path*", has: OLD_BLOG_HOST, destination: `${SITE}/blog`, permanent: true },
      { source: "/page/:path*", has: OLD_BLOG_HOST, destination: `${SITE}/blog`, permanent: true },
      { source: "/:slug", has: OLD_BLOG_HOST, destination: `${SITE}/blog/:slug`, permanent: true },
      { source: "/:path*", has: OLD_BLOG_HOST, destination: `${SITE}/blog`, permanent: true },
    ];
  },
};

export default nextConfig;
