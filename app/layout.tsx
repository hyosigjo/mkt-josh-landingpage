import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://mkt.joshlife.co.kr";
const GTM_ID = "GTM-KXZ6NDGG";

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
  verification: {
    google: "NjqEYQCSRtqi8puBGDaiBruzyrW9VrvjyOvaTa86uo0",
    other: {
      "naver-site-verification": "ed004cbfca7c7c5f4268d042eb2f9321588e5db6",
    },
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
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
