import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  plan: string;
  message: string;
  submittedAt: string;
  source: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { channel: "email", status: "skipped" as const };

  const to = process.env.CONTACT_TO ?? "hyosigjo18@gmail.com";
  const from =
    process.env.RESEND_FROM ?? "마케터 조쉬 <onboarding@resend.dev>";

  const rows = [
    ["이름", payload.name],
    ["회사/서비스", payload.company || "-"],
    ["이메일", payload.email],
    ["연락처", payload.phone || "-"],
    ["관심 플랜", payload.plan || "-"],
    ["문의 내용", payload.message],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:700;color:#44521d;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:8px 12px;color:#2f3226;white-space:pre-wrap;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `[마케터 조쉬] 새 문의 — ${payload.name}${
        payload.plan ? ` (${payload.plan})` : ""
      }`,
      html: `<div style="font-family:sans-serif;max-width:560px;">
        <h2 style="color:#333f14;">새 문의가 도착했습니다 🚢</h2>
        <table style="border-collapse:collapse;background:#fbf1dc;border-radius:12px;width:100%;">${rows}</table>
        <p style="color:#9a9a90;font-size:12px;margin-top:16px;">${payload.source} · ${payload.submittedAt}</p>
      </div>`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
  return { channel: "email", status: "sent" as const };
}

async function sendToCrm(payload: ContactPayload) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return { channel: "crm", status: "skipped" as const };

  // CRM 인바운드 가이드 형식: FormData(name, company, email, phone, message)를
  // token 쿼리 파라미터가 포함된 URL로 POST
  const form = new FormData();
  form.set("name", payload.name);
  form.set("company", payload.company);
  form.set("email", payload.email);
  form.set("phone", payload.phone);
  form.set(
    "message",
    payload.plan
      ? `${payload.message}\n\n[관심 플랜] ${payload.plan}`
      : payload.message
  );
  form.set("source", payload.source);
  form.set("submittedAt", payload.submittedAt);

  const res = await fetch(webhookUrl, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`CRM webhook ${res.status}: ${body.slice(0, 300)}`);
  }
  return { channel: "crm", status: "sent" as const };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  // honeypot: bots fill the hidden field — pretend success, do nothing
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const plan = typeof body.plan === "string" ? body.plan.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "이름, 이메일, 문의 내용은 필수입니다." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "이메일 형식을 확인해주세요." },
      { status: 400 }
    );
  }
  if (
    name.length > 100 ||
    company.length > 200 ||
    phone.length > 50 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, error: "입력 길이가 너무 깁니다." },
      { status: 400 }
    );
  }

  const payload: ContactPayload = {
    name,
    company,
    email,
    phone,
    plan,
    message,
    submittedAt: new Date().toISOString(),
    source: "mkt.joshlife.co.kr",
  };

  const results = await Promise.allSettled([
    sendEmail(payload),
    sendToCrm(payload),
  ]);

  const outcomes = results.map((result, i) =>
    result.status === "fulfilled"
      ? result.value
      : { channel: i === 0 ? "email" : "crm", status: "failed" as const }
  );

  results.forEach((result) => {
    if (result.status === "rejected") console.error(result.reason);
  });

  const delivered = outcomes.some((o) => o.status === "sent");
  if (!delivered) {
    // every configured channel failed, or nothing is configured yet
    return NextResponse.json(
      {
        ok: false,
        error:
          "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도하시거나 이메일로 직접 연락해주세요.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
