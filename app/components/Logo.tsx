export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* mast */}
      <path
        d="M140 30 L140 240"
        stroke="#3A3F3A"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* flag (notched pennant pointing left) */}
      <path
        d="M140 24 L86 18 L103 41 L86 60 L140 64 Z"
        fill="#3A3F3A"
        stroke="#3A3F3A"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* sail */}
      <path
        d="M134 80 C110 86 88 86 70 90 C56 120 56 152 71 180 C96 184 114 188 134 193 Z"
        fill="#FCF3DC"
        stroke="#3A3F3A"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <circle cx="88" cy="163" r="5.5" fill="#FFB606" />
      <circle cx="105" cy="167" r="5.5" fill="#FFB606" />
      <circle cx="122" cy="171" r="5.5" fill="#FFB606" />
      {/* llama ears */}
      <path
        d="M170 118 C158 98 160 78 173 68 C184 75 190 94 188 116 Z"
        fill="#FFFFFF"
        stroke="#3A3F3A"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <path
        d="M218 116 C216 94 222 75 233 68 C246 78 248 98 236 118 Z"
        fill="#FFFFFF"
        stroke="#3A3F3A"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      {/* llama fluffy head + body */}
      <path
        d="M152 232
           L152 192
           Q140 178 153 168
           Q143 152 158 145
           Q151 128 166 124
           Q162 108 178 112
           Q190 100 203 108
           Q216 100 228 112
           Q244 108 240 124
           Q255 128 248 145
           Q263 152 253 168
           Q266 178 254 192
           L254 232 Z"
        fill="#FFFFFF"
        stroke="#3A3F3A"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      {/* face */}
      <circle cx="185" cy="151" r="6.5" fill="#3A3F3A" />
      <circle cx="221" cy="151" r="6.5" fill="#3A3F3A" />
      <path
        d="M198 161 Q203 158 208 161 Q206 168 203 168 Q200 168 198 161 Z"
        fill="#3A3F3A"
      />
      <path
        d="M203 168 Q203 174 196 174 M203 168 Q203 174 210 174"
        stroke="#3A3F3A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* hull */}
      <path
        d="M58 228 L264 228 L242 290 Q161 302 80 290 Z"
        fill="#A06B0B"
        stroke="#3A3F3A"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      <circle cx="108" cy="256" r="8" fill="#3A3F3A" />
      <circle cx="142" cy="258" r="8" fill="#3A3F3A" />
      <circle cx="176" cy="258" r="8" fill="#3A3F3A" />
      <circle cx="210" cy="256" r="8" fill="#3A3F3A" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark className="h-10 w-10" />
      <span className="flex flex-col leading-none font-logo">
        <span className="text-[0.7rem] font-medium tracking-wide text-olive">
          Marketer
        </span>
        <span className="text-xl font-extrabold tracking-tight text-olive-deep">
          Josh
        </span>
      </span>
    </span>
  );
}
