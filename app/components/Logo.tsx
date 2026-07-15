/* eslint-disable @next/next/no-img-element */

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-symbol.svg"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className ?? ""}`}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="Marketer Josh"
      className={`h-10 w-auto ${className ?? ""}`}
    />
  );
}
