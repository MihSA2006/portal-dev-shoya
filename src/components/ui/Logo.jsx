export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="shoya-g" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-strong)" />
          </linearGradient>
        </defs>
        <path d="M6 4h28v10H16v4h18v18H6V26h18v-4H6V4Z" fill="url(#shoya-g)" />
      </svg>
      <div className="leading-tight">
        <p className="font-display text-xl font-semibold tracking-wide text-[var(--text)]">
          Shoya<span className="text-[var(--accent)]">Dev</span>
        </p>
        <p className="hidden sm:block text-[11px] text-[var(--text-muted)]">Build · Document · Scale</p>
      </div>
    </div>
  );
}
