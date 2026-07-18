"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_THEME } from "@/lib/chart-theme";

function formatFcfa(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

export function RevenueTrendChart({ data }: { data: { date: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="esmfRevenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_THEME.primary} stopOpacity={0.28} />
            <stop offset="100%" stopColor={CHART_THEME.primary} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDateShort}
          tick={{ fontSize: 12, fill: CHART_THEME.textMuted }}
          axisLine={{ stroke: CHART_THEME.grid }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `${Math.round(v / 1000)}k`}
          tick={{ fontSize: 12, fill: CHART_THEME.textMuted }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value: number) => [formatFcfa(value), "Revenu"]}
          labelFormatter={(label: string) => formatDateShort(label)}
          contentStyle={{
            borderRadius: 8,
            border: `1px solid ${CHART_THEME.grid}`,
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={CHART_THEME.primary}
          strokeWidth={2}
          fill="url(#esmfRevenueFill)"
          dot={{ r: 3, strokeWidth: 0, fill: CHART_THEME.primary }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
