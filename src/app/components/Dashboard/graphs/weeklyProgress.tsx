import { IDashboardDia } from "../../../types/dashboard/dashboard";

const WeeklyProgress: React.FC<{ dias: IDashboardDia[] }> = ({ dias }) => {
  const maior = Math.max(...dias.map(item => item.total), 1);

  return (
    <div className="flex justify-between items-end mt-2 px-2">
      {dias.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">

          {/* badge HOJE */}
          {item.hoje && (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-400 text-white font-semibold">
              HOJE
            </span>
          )}

          {/* barra */}
          <div className="h-16 w-1.5 bg-slate-200 rounded-full flex flex-col-reverse overflow-hidden">
            <div
              className={`
                w-full rounded-full transition-all duration-700
                ${item.hoje ? 'bg-yellow-400' : 'bg-[#112C46]'}
              `}
              style={{ height: `${(item.total / maior) * 100}%` }}
            />
          </div>

          {/* bolinha */}
          <div
            className={`
              w-1.5 h-1.5 rounded-full
              ${item.hoje ? 'bg-yellow-400' : 'bg-slate-400'}
            `}
          />

          {/* label */}
          <span className="text-[10px] text-slate-400">
            {item.dia}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WeeklyProgress;
