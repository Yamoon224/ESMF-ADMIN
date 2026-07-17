type BrandMarkProps = {
  size?: number;
  className?: string;
};

/** ESMF monogram badge — Enagnon Sécurité Mobilité Femme. */
export function BrandMark({ size = 34, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="ESMF"
    >
      <rect width="100" height="100" rx="24" fill="white" />
      <rect x="8" y="8" width="18" height="18" rx="6" fill="var(--esmf-alert)" />
      <text
        x="58"
        y="68"
        textAnchor="middle"
        fontFamily="var(--font-sora), sans-serif"
        fontWeight="700"
        fontSize="52"
        fill="var(--esmf-primary)"
      >
        E
      </text>
    </svg>
  );
}

type BrandLockupProps = {
  className?: string;
  tagline?: string;
};

export function BrandLockup({ className, tagline = "Dashboard admin" }: BrandLockupProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <BrandMark size={34} />
      <span className="font-display text-sm font-bold leading-tight text-white">
        ESMF
        <span className="mt-0.5 block font-sans text-[10.5px] font-normal text-white/60">
          {tagline}
        </span>
      </span>
    </div>
  );
}
