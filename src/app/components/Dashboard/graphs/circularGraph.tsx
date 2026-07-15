'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const renderDot = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    endAngle,
    index,
  } = props;

  if (index !== 0) return null;

  const RADIAN = Math.PI / 180;
  const angle = -endAngle * RADIAN;

  // posição correta: meio do arco
  const radius = innerRadius + (outerRadius - innerRadius) / 2;

  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);

  return (
    <circle
      cx={x}
      cy={y}
      r={7}
      fill="#112C46"
      stroke="#6A5FF2"
      strokeWidth={3}
    />
  );
};

interface ICircularGraph{
    value: number
}

const CircularGraph:React.FC<ICircularGraph> = ({value}) => {
  const data = [
    { value: value },
    { value: 100 - value },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 200, height: 160 }}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="85%"
          startAngle={90}
          endAngle={-270}
          stroke="none"
          label={renderDot}
          labelLine={false}
        >
          <Cell fill="#112C46" />
          <Cell fill="#E5E7EB" />

          {/* número central */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[#112C46] font-semibold text-[22px]"
          >
            {value}%
          </text>
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CircularGraph;
