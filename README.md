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

## 문의 폼 연동 (이메일 + CRM)

문의 폼 제출은 `/api/contact` 라우트가 처리하며, 두 곳으로 동시에 전달됩니다.

1. **이메일 (Resend)** — 새 문의가 `CONTACT_TO` 주소로 발송됩니다.
2. **자체 CRM (웹훅)** — `CRM_WEBHOOK_URL`로 아래 형태의 JSON이 POST 됩니다.

```json
{
  "source": "mkt.joshlife.co.kr",
  "submittedAt": "2026-07-15T12:34:56.789Z",
  "name": "홍길동",
  "company": "조쉬랩스",
  "email": "reply@company.com",
  "plan": "해줘쉬 (B2B 마케팅 실행)",
  "message": "문의 내용..."
}
```

### 설정 방법

1. `.env.example`을 참고해 환경변수를 준비합니다.
   - 로컬: `.env.local` 파일 생성
   - 프로덕션: Vercel **Settings → Environment Variables**에 등록
2. **Resend 설정**
   1. https://resend.com 가입 후 API 키 발급 → `RESEND_API_KEY`
   2. 도메인 인증 전에는 `RESEND_FROM`을 비워두면 `onboarding@resend.dev`로 발송됩니다(테스트용).
   3. Resend에 `joshlife.co.kr` 도메인을 인증하면 `RESEND_FROM=마케터 조쉬 <josh@joshlife.co.kr>`처럼 브랜드 주소로 발송할 수 있습니다.
3. **CRM 웹훅 설정**
   - CRM에서 리드를 받을 엔드포인트 URL을 `CRM_WEBHOOK_URL`에 넣습니다.
   - 인증이 필요하면 `CRM_WEBHOOK_SECRET`을 설정하세요. 요청에 `Authorization: Bearer <값>` 헤더가 추가됩니다.

두 채널 중 하나라도 성공하면 사용자에게는 접수 완료로 표시되고, 실패한 채널은 서버 로그(Vercel Functions 로그)에 기록됩니다. 스팸은 허니팟 필드로 1차 차단됩니다.

## 콘텐츠 수정 위치

- 메인 카피, 서비스, 플랜, FAQ: `app/page.tsx` 상단의 상수(`SERVICES`, `PLANS`, `FAQS` 등)
- 브랜드 컬러: `app/globals.css`의 `@theme` 블록
- 로고: `app/components/Logo.tsx`
- SEO 메타데이터: `app/layout.tsx`
