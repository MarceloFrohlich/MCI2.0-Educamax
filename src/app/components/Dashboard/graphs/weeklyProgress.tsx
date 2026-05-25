interface DayProgress {
  day: string;
  value: number;
  isToday?: boolean;
}

const data: DayProgress[] = [
  { day: 'D', value: 25 },
  { day: 'S', value: 45 },
  { day: 'T', value: 55 },
  { day: 'Q', value: 65 },
  { day: 'Q', value: 70 },
  { day: 'S', value: 85, isToday: true },
  { day: 'S', value: 30 },
];

const WeeklyProgress:React.FC = () => {
  return (
    <div className="flex justify-between items-end mt-2 px-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          
          {/* badge HOJE */}
          {item.isToday && (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-400 text-white font-semibold">
              HOJE
            </span>
          )}

          {/* barra */}
          <div className="h-16 w-1.5 bg-slate-200 rounded-full flex flex-col-reverse overflow-hidden">
            <div
              className={`
                w-full rounded-full transition-all duration-700
                ${item.isToday ? 'bg-yellow-400' : 'bg-[#112C46]'}
              `}
              style={{ height: `${item.value}%` }}
            />
          </div>

          {/* bolinha */}
          <div
            className={`
              w-1.5 h-1.5 rounded-full
              ${item.isToday ? 'bg-yellow-400' : 'bg-slate-400'}
            `}
          />

          {/* label */}
          <span className="text-[10px] text-slate-400">
            {item.day}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WeeklyProgress;
