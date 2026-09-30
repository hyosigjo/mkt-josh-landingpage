"use client";

import { useState } from "react";

const TOPIC_OPTIONS = [
  "커피챗",
  "협업 · 프로젝트 제안",
  "강연 · 기고 · 인터뷰 요청",
  "블로그 글에 대한 이야기",
  "기타",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border-2 border-olive/15 bg-cream/60 px-4 py-3 text-sm font-medium text-ink placeholder:text-ink/35 transition-colors focus:border-tangerine focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMessage(
          json.error ?? "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl bg-white p-10 text-center">
        <span className="text-5xl">🚢</span>
        <h3 className="mt-4 text-2xl font-extrabold text-olive-deep">
          메시지가 잘 도착했어요!
        </h3>
        <p className="mt-3 leading-relaxed text-ink/70">
          꼼꼼히 읽고 남겨주신 이메일로 답장드릴게요.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-bold text-olive underline underline-offset-4 hover:text-olive-deep"
        >
          다른 메시지 보내기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl bg-white p-7 sm:p-9"
    >
      {/* honeypot — humans never see or fill this */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-bold text-olive-deep"
          >
            이름 <span className="text-tangerine-deep">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            required
            maxLength={100}
            placeholder="홍길동"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="mb-1.5 block text-sm font-bold text-olive-deep"
          >
            소속
          </label>
          <input
            id="contact-company"
            name="company"
            maxLength={200}
            placeholder="회사, 학교 등 (선택)"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-bold text-olive-deep"
          >
            이메일 <span className="text-tangerine-deep">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="reply@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-sm font-bold text-olive-deep"
          >
            연락처
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            maxLength={50}
            placeholder="010-0000-0000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-topic"
          className="mb-1.5 block text-sm font-bold text-olive-deep"
        >
          어떤 이야기인가요?
        </label>
        <select
          id="contact-topic"
          name="topic"
          defaultValue=""
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            선택해주세요
          </option>
          {TOPIC_OPTIONS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-bold text-olive-deep"
        >
          하고 싶은 이야기 <span className="text-tangerine-deep">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="편하게 적어주세요. 어떤 이야기든 반갑습니다."
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-olive px-7 py-4 text-base font-bold text-cream shadow-[0_4px_0_0_var(--color-olive-deep)] transition-all duration-150 hover:translate-y-1 hover:bg-olive-deep hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
      >
        {status === "submitting" ? "보내는 중..." : "메시지 보내기 →"}
      </button>
      <p className="text-center text-xs text-ink/45">
        남겨주신 정보는 답장을 위해서만 사용됩니다.
      </p>
    </form>
  );
}
