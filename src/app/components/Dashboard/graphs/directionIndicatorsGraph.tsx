"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "PE", meta: 180, resultado: 200 },
  { name: "VR", meta: 90, resultado: 99 },
  { name: "LQ", meta: 140, resultado: 152 },
  { name: "RA", meta: 98, resultado: 115 },
  { name: "F-up", meta: 130, resultado: 148 },
];

export default function DirectionIndicatorsChart() {
  return (
    <div className="w-full h-full -mx-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            domain={[0, 300]}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="line"
            wrapperStyle={{ paddingTop: 16, marginLeft: 24, marginBottom: 8 }}
          />

          <Bar
            dataKey="meta"
            fill="#0f172a"
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />

          <Bar
            dataKey="resultado"
            fill="#fbbf24"
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

