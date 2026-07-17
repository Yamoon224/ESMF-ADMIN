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
            <stop offset="0%" stopColor="#1B3A6B" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#1B3A6B" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#D7E3F2" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDateShort}
          tick={{ fontSize: 12, fill: "#555555" }}
          axisLine={{ stroke: "#D7E3F2" }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `${Math.round(v / 1000)}k`}
          tick={{ fontSize: 12, fill: "#555555" }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value: number) => [formatFcfa(value), "Revenu"]}
          labelFormatter={(label: string) => formatDateShort(label)}
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #D7E3F2",
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#1B3A6B"
          strokeWidth={2}
          fill="url(#esmfRevenueFill)"
          dot={{ r: 3, strokeWidth: 0, fill: "#1B3A6B" }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
