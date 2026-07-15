import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://mkt.joshlife.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "마케터 조쉬 | B2B 인바운드 퍼널 구축 파트너",
    template: "%s | 마케터 조쉬",
  },
  description:
    "5년 이상 이커머스·AI 도메인에서 B2B 마케팅을 해온 마케터 조쉬가 초기 단계 비즈니스의 인바운드 퍼널을 함께 만듭니다. 핵심 메시지 발굴부터 랜딩페이지, 블로그 SEO, 인스타그램, 메타 광고, 아웃바운드까지.",
  keywords: [
    "B2B 마케팅",
    "인바운드 마케팅",
    "퍼널 구축",
    "마케팅 대행사",
    "스타트업 마케팅",
    "블로그 SEO",
    "메타 광고",
    "마케터 조쉬",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "마케터 조쉬",
    title: "마케터 조쉬 | B2B 인바운드 퍼널 구축 파트너",
    description:
      "좋은 제품이 먼저 발견되도록. 초기 단계 비즈니스의 B2B 인바운드 퍼널을 함께 만듭니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "마케터 조쉬 | B2B 인바운드 퍼널 구축 파트너",
    description:
      "좋은 제품이 먼저 발견되도록. 초기 단계 비즈니스의 B2B 인바운드 퍼널을 함께 만듭니다.",
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
