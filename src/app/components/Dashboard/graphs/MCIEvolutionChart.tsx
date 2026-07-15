'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

import { IMciEvolutionDataPoint } from '../../../types/dashboard/dashboard';

interface IMciEvolutionChart {
    data: IMciEvolutionDataPoint[];
    graphHeight?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-md text-xs shadow-lg">
            <div className="text-slate-400 mb-2 font-medium">
                {label}
            </div>

            <div className="flex flex-col gap-1">
                {payload.map((item: any) => {
                    if (item.value === null || item.value === undefined) return null;

                    return (
                        <div
                            key={item.dataKey}
                            className="flex justify-between gap-6"
                        >
                            <span className="text-slate-300">
                                {item.dataKey === 'meta'
                                    ? 'Meta'
                                    : 'Atual'}
                            </span>

                            <span className="font-semibold">
                                {Number(item.value).toFixed(1)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const MciEvolutionChart: React.FC<IMciEvolutionChart> = ({
    data,
    graphHeight = 'h-50',
}) => {
    return (
        <div className={`w-full ${graphHeight} -mx-2`}>
            <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 500, height: 200 }}>
                <LineChart
                    key={JSON.stringify(data)}
                    data={data}
                    margin={{
                        top: 8,
                        right: 8,
                        bottom: 0,
                        left: 0,
                    }}
                >
                    <CartesianGrid
                        stroke="#CBD5E1"
                        strokeDasharray="0"
                        vertical={false}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <XAxis
                        dataKey="week"
                        tick={{ fontSize: 11, fill: '#64748B' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        width={35}
                        domain={['auto', 'auto']}
                        tick={{ fontSize: 11, fill: '#64748B' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* META */}
                    <Line
                        type="linear"
                        dataKey="meta"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1200}
                        animationBegin={0}
                        animationEasing="ease-out"
                        isAnimationActive
                    />

                    {/* ATUAL */}
                    <Line
                        type="monotone"
                        dataKey="atual"
                        stroke="#4B5563"
                        strokeWidth={2.5}
                        dot={{
                            r: 4,
                        }}
                        activeDot={{
                            r: 7,
                        }}
                        connectNulls={false}
                        animationDuration={1400}
                        animationBegin={200}
                        animationEasing="ease-out"
                        isAnimationActive
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className="mx-8 flex gap-4 items-center mt-2">
                <div className="flex gap-3 items-center">
                    <div className="h-4 w-10 bg-[#F59E0B]" />
                    <small>Meta</small>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="h-4 w-10 bg-[#4B5563]" />
                    <small>Atual</small>
                </div>
            </div>
        </div>
    );
};

export default MciEvolutionChart;