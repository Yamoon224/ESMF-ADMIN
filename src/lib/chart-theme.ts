/**
 * Recharts SVG props take literal color values, not CSS custom properties,
 * so the design tokens from globals.css are mirrored here once rather than
 * hardcoded per chart.
 */
export const CHART_THEME = {
  primary: "#12315c",
  grid: "#e3e8f0",
  textMuted: "#667389",
  text: "#16233a",
} as const;
