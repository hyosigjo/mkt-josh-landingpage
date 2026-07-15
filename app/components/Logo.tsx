export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* sail */}
      <path
        d="M46 34 C29 40 26 60 31 78 L46 78 Z"
        fill="#FDF6E3"
        stroke="#3A3A34"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="70" r="2.4" fill="#FFB606" />
      <circle cx="42" cy="72" r="2.4" fill="#FFB606" />
      {/* mast */}
      <path
        d="M52 16 L52 82"
        stroke="#3A3A34"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* flag */}
      <path d="M52 17 L82 23 L52 33 Z" fill="#3A3A34" />
      {/* llama ears */}
      <path
        d="M68 48 L72 30 L80 44 Z"
        fill="#FFFFFF"
        stroke="#3A3A34"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M88 44 L94 30 L99 48 Z"
        fill="#FFFFFF"
        stroke="#3A3A34"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* llama head + body */}
      <path
        d="M62 92 L62 60 Q62 42 74 42 Q78 34 84 41 Q92 38 96 46 Q104 48 104 60 L104 92 Z"
        fill="#FFFFFF"
        stroke="#3A3A34"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* face */}
      <circle cx="76" cy="62" r="3" fill="#3A3A34" />
      <circle cx="92" cy="62" r="3" fill="#3A3A34" />
      <path
        d="M81 70 Q84 74 87 70"
        stroke="#3A3A34"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* hull */}
      <path
        d="M32 86 L112 86 L103 110 Q71 117 41 110 Z"
        fill="#9E6C0A"
        stroke="#3A3A34"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="55" cy="97" r="3.4" fill="#3A3A34" />
      <circle cx="72" cy="98" r="3.4" fill="#3A3A34" />
      <circle cx="89" cy="97" r="3.4" fill="#3A3A34" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark className="h-10 w-10" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.72rem] font-semibold tracking-wide text-olive">
          Marketer
        </span>
        <span className="text-xl font-extrabold tracking-tight text-olive-deep">
          Josh
        </span>
      </span>
    </span>
  );
}
