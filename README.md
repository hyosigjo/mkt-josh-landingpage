# 마케터 조쉬 랜딩페이지

B2B 인바운드 퍼널 구축 서비스 '마케터 조쉬'의 공식 랜딩페이지입니다.

- **프로덕션 URL**: https://mkt.joshlife.co.kr
- **스택**: Next.js (App Router) + Tailwind CSS v4 + TypeScript

## 로컬 개발

```bash
npm install
npm run dev   # http://localhost:3000
```

## 빌드

```bash
npm run build
npm start
```

## Vercel 배포 가이드

1. [Vercel](https://vercel.com)에서 **Add New → Project**를 선택하고 이 GitHub 저장소를 import 합니다.
   - Framework Preset이 **Next.js**로 자동 감지됩니다. 별도 설정 없이 Deploy를 누르면 됩니다.
2. 배포가 완료되면 프로젝트 **Settings → Domains**에서 `mkt.joshlife.co.kr`을 추가합니다.
3. `joshlife.co.kr` 도메인을 관리하는 DNS(예: 가비아, 후이즈, Cloudflare)에서 아래 레코드를 추가합니다.

   | 타입  | 호스트(이름) | 값                     |
   | ----- | ------------ | ---------------------- |
   | CNAME | `mkt`        | `cname.vercel-dns.com` |

4. DNS 전파(보통 수 분 ~ 최대 48시간) 후 Vercel이 자동으로 SSL 인증서를 발급하면 `https://mkt.joshlife.co.kr`로 접속할 수 있습니다.

## 콘텐츠 수정 위치

- 메인 카피, 서비스, 플랜, FAQ: `app/page.tsx` 상단의 상수(`SERVICES`, `PLANS`, `FAQS` 등)
- 브랜드 컬러: `app/globals.css`의 `@theme` 블록
- 로고: `app/components/Logo.tsx`
- SEO 메타데이터: `app/layout.tsx`
