import Link from "next/link";

/**
 * Indicateur SOS : DOIT rester visuellement impossible à manquer.
 * Le CDCF (§5.2, §8) qualifie le SOS de fonctionnalité la plus critique du
 * produit — priorité maximale d'affichage, icône rouge clignotante.
 */
export function SosAlertBanner({ activeCount }: { activeCount: number }) {
  if (activeCount === 0) {
    return (
      <Link
        href="/incidents-sos"
        className="flex items-center gap-2 rounded-full border border-esmf-border px-3 py-1.5 text-xs font-medium text-esmf-text-muted transition hover:border-esmf-success/40 hover:text-esmf-success"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-esmf-success" />
        Aucune alerte SOS active
      </Link>
    );
  }

  return (
    <Link
      href="/incidents-sos"
      className="flex items-center gap-2 rounded-full bg-esmf-alert px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-esmf-alert/30 animate-sos-blink"
      aria-live="assertive"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      {activeCount} ALERTE{activeCount > 1 ? "S" : ""} SOS ACTIVE{activeCount > 1 ? "S" : ""}
    </Link>
  );
}
