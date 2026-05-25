interface MciItem {
  id: string;
  percent: number;
  color: 'green' | 'orange' | 'yellow';
}

const data: MciItem[] = [
  { id: '01', percent: 20, color: 'orange' },
  { id: '02', percent: 90, color: 'green' },
  { id: '03', percent: 85, color: 'green' },
  { id: '04', percent: 80, color: 'green' },
  { id: '05', percent: 88, color: 'green' },
  { id: '06', percent: 45, color: 'orange' },
  { id: '07', percent: 30, color: 'yellow' },
  { id: '08', percent: 60, color: 'yellow' },
];

const colorMap = {
  green: 'bg-green-500',
  orange: 'bg-orange-400',
  yellow: 'bg-yellow-400',
};

const ActiveMciBars:React.FC = () => {
  return (
    <div className="flex flex-col gap-0.5 mt-3">
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-">
          <span className="text-[11px] text-slate-400 w-5">
            {item.id}
          </span>

          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${colorMap[item.color]} transition-all duration-700`}
              style={{ width: `${item.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveMciBars;
