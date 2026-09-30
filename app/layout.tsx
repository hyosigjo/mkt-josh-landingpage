import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://mkt.joshlife.co.kr";

const title = "마케터 조쉬 | 콘텐츠로 고객을 돕는 마케터";
const description =
  "스타트업에서 마케터로 일하면서 느낀 점과 지식, 경험을 공유합니다. 이커머스·AI 도메인 5년+ B2B 마케터 조쉬의 블로그.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | 마케터 조쉬",
  },
  description,
  keywords: [
    "마케터 조쉬",
    "B2B 마케팅",
    "인바운드 마케팅",
    "스타트업 마케팅",
    "마케터 커리어",
    "마케팅 블로그",
  ],
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "마케터 조쉬",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
