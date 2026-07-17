type BrandMarkProps = {
  size?: number;
  className?: string;
};

/**
 * The three chevrons converge toward a center point — the logo's own geometry,
 * reused as the product's signature mark rather than redrawn as a generic icon.
 */
export function BrandMark({ size = 34, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="Le Grand Frère"
    >
      <path d="M50 14 L74 30 L50 46 L26 30 Z" fill="var(--esmf-alert)" />
      <path d="M26 30 L50 46 L50 78 L26 62 Z" fill="var(--esmf-success)" />
      <path d="M74 30 L50 46 L50 78 L74 62 Z" fill="var(--esmf-secondary)" />
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
        Le Grand Frère
        <span className="mt-0.5 block font-sans text-[10.5px] font-normal text-white/60">
          {tagline}
        </span>
      </span>
    </div>
  );
}
