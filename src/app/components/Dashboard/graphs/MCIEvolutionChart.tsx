'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { week: 'Sem 1', atual: 10, meta: 0 },
    { week: 'Sem 2', atual: 30, meta: 10 },
    { week: 'Sem 3', atual: 55, meta: 20 },
    { week: 'Sem 4', atual: 75, meta: 30 },
    { week: 'Sem 5', atual: 35, meta: 40 },
    { week: 'Sem 6', atual: 45, meta: 50 },
    { week: 'Sem 7', atual: 38, meta: 60 },
    { week: 'Sem 8', atual: 95, meta: 70 },
    { week: 'Sem 9', atual: 50, meta: 80 },
    { week: 'Sem 10', atual: 35, meta: 90 },
];

const MciEvolutionChart: React.FC = () => {
    return (
        <div className="w-full h-50 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>

                    {/* grid horizontal */}
                    <CartesianGrid
                        stroke="#CBD5E1"
                        strokeDasharray="0"
                        vertical={false}
                    />

                    {/* eixo X */}
                    <XAxis
                        dataKey="week"
                        tick={{ fontSize: 11, fill: '#64748B' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* eixo Y */}
                    <YAxis
                        width={30}
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: '#64748B' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* linha meta */}
                    <Line
                        type="linear"
                        dataKey="meta"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={false}
                    />

                    {/* linha atual */}
                    <Line
                        type="monotone"
                        dataKey="atual"
                        stroke="#4B5563"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className='mx-8 flex gap-4 items-center'>
                <div className='flex gap-3 items-center'>
                    <div className='h-4 w-10 bg-[#F59E0B]'></div>
                    <small>Meta</small>
                </div>
                <div className='flex gap-3 items-center'>
                    <div className='h-4 w-10 bg-[#4B5563]'></div>
                    <small>Atual</small>
                </div>
            </div>
        </div>
    );
};

export default MciEvolutionChart;
