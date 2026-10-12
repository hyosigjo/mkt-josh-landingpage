import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://mkt.joshlife.co.kr";
const GTM_ID = "GTM-KXZ6NDGG";

const title = "마케터 조쉬 | 리드가 아니라 상담을 만드는 B2B 마케터";
const description =
  "세일즈가 꼭 만나야 할 고객을 데려오는 B2B 마케터 조쉬입니다. B2B 마케팅 5년, AI·이커머스·글로벌, 비즈니스 일본어(JLPT N1). 일하며 배운 것들을 블로그에 기록합니다.";

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
    "도입상담",
    "MQL",
    "메타 광고",
    "B2B 세일즈",
    "일본 마케팅",
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
