# 마케터 조쉬

마케터 조쉬의 퍼스널 브랜딩 사이트 겸 블로그입니다. (이전 Ghost 블로그 blog.joshlife.co.kr 에서 이전)

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

## 문의 폼 연동 (이메일 + CRM)

문의 폼 제출은 `/api/contact` 라우트가 처리하며, 두 곳으로 동시에 전달됩니다.

1. **이메일 (Resend)** — 새 문의가 `CONTACT_TO` 주소로 발송됩니다.
2. **자체 CRM (인바운드 웹훅)** — CRM 가이드 형식대로 `CRM_WEBHOOK_URL`(token 쿼리 포함)로 **FormData**가 POST 됩니다.

   | 필드 | 내용 |
   | --- | --- |
   | `name` | 이름 |
   | `company` | 소속 |
   | `email` | 이메일 |
   | `phone` | 연락처 |
   | `message` | 메시지 내용 (끝에 `[문의 유형] ...` 이 덧붙습니다) |
   | `source`, `submittedAt` | 추가 메타 정보 (CRM이 무시해도 무방) |

### 설정 방법

1. `.env.example`을 참고해 환경변수를 준비합니다.
   - 로컬: `.env.local` 파일 생성
   - 프로덕션: Vercel **Settings → Environment Variables**에 등록
2. **Resend 설정**
   1. https://resend.com 가입 후 API 키 발급 → `RESEND_API_KEY`
   2. 도메인 인증 전에는 `RESEND_FROM`을 비워두면 `onboarding@resend.dev`로 발송됩니다(테스트용).
   3. Resend에 `joshlife.co.kr` 도메인을 인증하면 `RESEND_FROM=마케터 조쉬 <josh@joshlife.co.kr>`처럼 브랜드 주소로 발송할 수 있습니다.
3. **CRM 웹훅 설정**
   - CRM 가이드에서 받은 인바운드 URL 전체(`https://crm.joshlife.co.kr/api/inbound/lead?token=<INBOUND_TOKEN>`)를 `CRM_WEBHOOK_URL`에 넣습니다.
   - 토큰이 URL에 포함되므로 반드시 환경변수로만 관리하세요. 서버(API 라우트)에서 전송하기 때문에 브라우저에는 토큰이 노출되지 않습니다.

두 채널 중 하나라도 성공하면 사용자에게는 접수 완료로 표시되고, 실패한 채널은 서버 로그(Vercel Functions 로그)에 기록됩니다. 스팸은 허니팟 필드로 1차 차단됩니다.

## 블로그

글은 모두 `content/` 폴더의 마크다운 파일입니다. 별도 CMS나 요금 없이, 파일을 추가·수정해 푸시하면 Vercel이 다시 배포합니다.

| 위치 | 내용 |
| --- | --- |
| `content/blog/*.md` | 공개된 글 (파일 이름 = 주소, 예: `why_blog.md` → `/blog/why_blog`) |
| `content/drafts/*.md` | 공개되지 않는 초안. `content/blog/`로 옮기면 공개됩니다 |
| `content/tags.json` | 태그(주제) 이름과 설명 |
| `public/blog/images/` | 글에 쓰는 이미지 |

### 새 글 쓰기

`content/blog/새-글-주소.md` 파일을 만들고 맨 위에 아래 정보를 적은 뒤 본문을 마크다운으로 씁니다. 이미지는 `public/blog/images/` 아래에 넣고 `/blog/images/...` 경로로 불러옵니다.

```markdown
---
title: 글 제목
date: 2026-10-01
tags:
  - marketing
excerpt: 목록과 검색 결과에 보일 한두 문장 요약 (생략하면 본문 앞부분 사용)
cover: /blog/images/2026/10/cover.jpg
---

본문을 씁니다.

> 💡 이모지로 시작하는 인용문은 콜아웃 박스로 표시됩니다.

<details>
<summary>펼쳐보기 제목</summary>

접히는 내용

</details>
```

휴대폰 사진처럼 큰 이미지를 넣었다면 `node scripts/optimize-blog-images.mjs`를 실행하세요. 200KB 넘는 PNG/JPG를 WebP로 바꾸고 글 속 경로까지 자동으로 고쳐줍니다.

태그는 `content/tags.json`에 있는 키(`marketing`, `insight`, `career`, `books`, `favorite_things`, `skincare`)를 쓰고, 새 태그가 필요하면 그 파일에 추가하세요.

### Ghost에서 옮겨온 방법

1. `node scripts/ghost-import.mjs <ghost-export.json>` — Ghost 내보내기 JSON을 마크다운으로 변환하고, 이미지 원본 주소를 `content/image-manifest.json`에 기록합니다. (공개 글 66개, 초안 58개, 회원 전용 글 2개. 내보내기 JSON 자체는 설정 정보가 들어 있어 레포에 올리지 않습니다.)
2. `.github/workflows/fetch-blog-images.yml` — 매니페스트가 바뀌면 GitHub Actions가 이미지를 내려받아(1600px 초과는 축소·재압축) `public/blog/images/`에 커밋합니다. Actions 탭에서 수동 실행도 가능합니다. 받지 못한 이미지는 본문에서 원래 주소로 되돌리고 `content/image-fetch-report.json`에 남깁니다.
3. `next.config.ts`의 리다이렉트 — `blog.joshlife.co.kr` 도메인을 이 Vercel 프로젝트에 연결하면 옛 글·태그·이미지·RSS 주소가 새 주소로 영구 이동(308)됩니다.

## 콘텐츠 수정 위치

- 홈 카피(소개, 키워드): `app/page.tsx`
- 헤더·푸터·연락처 이메일: `app/components/SiteChrome.tsx`
- 문의 유형 선택지: `app/components/ContactForm.tsx`의 `TOPIC_OPTIONS`
- 브랜드 컬러, 블로그 본문 스타일: `app/globals.css`
- 로고: `app/components/Logo.tsx`
- SEO 메타데이터·공유 이미지(`public/og-image.jpg`): `app/layout.tsx`
