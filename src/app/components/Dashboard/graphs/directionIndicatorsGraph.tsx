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

import { IDashboardUnidade } from "../../../types/dashboard/dashboard";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-slate-900 text-white px-3 py-2 rounded-md text-xs shadow-lg">
      <div className="text-slate-400 mb-2 font-medium">
        {payload[0].payload.nome}
      </div>

      <div className="flex flex-col gap-1">
        {payload.map((item: any) => (
          <div key={item.dataKey} className="flex justify-between gap-6">
            <span className="text-slate-300">
              {item.dataKey === "meta" ? "Meta" : "Resultado"}
            </span>
            <span className="font-semibold">{Number(item.value).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DirectionIndicatorsChart({ unidades }: { unidades: IDashboardUnidade[] }) {
  const data = unidades.map(unidade => ({
    name: unidade.sigla,
    nome: unidade.nome,
    meta: unidade.meta,
    resultado: unidade.resultado,
  }));

  return (
    <div className="w-full h-full -mx-6">
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 500, height: 220 }}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            domain={[0, 'auto']}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip content={<CustomTooltip />} />

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
