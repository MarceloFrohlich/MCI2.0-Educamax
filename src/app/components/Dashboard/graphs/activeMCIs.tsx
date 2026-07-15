'use client'

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IDashboardMci } from "../../../types/dashboard/dashboard";

const colorMap = {
  verde: 'bg-green-500',
  laranja: 'bg-orange-400',
  amarelo: 'bg-yellow-400',
};

const ActiveMciBars: React.FC<{ lista: IDashboardMci[] }> = ({ lista }) => {
  const listaRef = useRef<HTMLDivElement>(null);
  const [temAcima, setTemAcima] = useState(false);
  const [temAbaixo, setTemAbaixo] = useState(false);

  const verificarScroll = () => {
    const el = listaRef.current;
    if (!el) return;
    setTemAcima(el.scrollTop > 0);
    setTemAbaixo(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  };

  useEffect(() => {
    verificarScroll();
  }, [lista]);

  const rolar = (direcao: number) => {
    listaRef.current?.scrollBy({ top: direcao * 48, behavior: 'smooth' });
  };

  return (
    <div className="mt-1">
      {/* seta pra cima */}
      <div className={`h-3 flex justify-center transition-opacity duration-300 ${temAcima ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => rolar(-1)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
          <FiChevronUp size={12} />
        </button>
      </div>

      <div
        ref={listaRef}
        onScroll={verificarScroll}
        className="flex flex-col gap-0.5 max-h-28 overflow-y-auto no-scrollbar"
      >
        {lista.map((item, index) => (
          <div key={item.id_jogo} className="flex items-center gap-" title={item.nome}>
            <span className="text-[11px] text-slate-400 w-5">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${colorMap[item.situacao]} transition-all duration-700`}
                style={{ width: `${Math.min(item.percentual, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* seta pra baixo */}
      <div className={`h-3 flex justify-center transition-opacity duration-300 ${temAbaixo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => rolar(1)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
          <FiChevronDown size={12} />
        </button>
      </div>
    </div>
  );
};

export default ActiveMciBars;
