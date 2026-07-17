"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from "recharts";
import { ResponsiveContainer } from "recharts";

/**
 * Palette catégorielle validée (dataviz skill, mode light) :
 * node scripts/validate_palette.js "#2C4F89,#C8820A,#7E5BB5,#0E93A8,#B5527A" --mode light
 * → ALL CHECKS PASS. La paire #B5527A/#0E93A8 est en zone CVD 6-8 (légale
 * uniquement avec encodage secondaire) — d'où les étiquettes directes sur
 * l'axe Y (le nom de la méthode est toujours affiché en texte, jamais par
 * la seule couleur).
 */
const METHOD_COLORS = ["#2C4F89", "#C8820A", "#7E5BB5", "#0E93A8", "#B5527A"];

function formatFcfa(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export function MethodBreakdownChart({ data }: { data: { method: string; amount: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D7E3F2" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v) => `${Math.round(v / 1000)}k`}
          tick={{ fontSize: 12, fill: "#555555" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="method"
          tick={{ fontSize: 12, fill: "#1A1A1A" }}
          axisLine={false}
          tickLine={false}
          width={120}
        />
        <Tooltip
          formatter={(value: number) => [formatFcfa(value), "Montant"]}
          contentStyle={{ borderRadius: 8, border: "1px solid #D7E3F2", fontSize: 12 }}
        />
        <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={22}>
          {data.map((entry, index) => (
            <Cell key={entry.method} fill={METHOD_COLORS[index % METHOD_COLORS.length]} />
          ))}
          <LabelList
            dataKey="amount"
            position="right"
            formatter={(value: number) => formatFcfa(value)}
            style={{ fontSize: 11, fill: "#555555" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
