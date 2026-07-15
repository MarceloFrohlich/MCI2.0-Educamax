'use client'

import { FiAlertTriangle } from "react-icons/fi";
import { CiCircleAlert, CiTimer } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import { JSX } from "react";
import { IDashboardAlerta } from "../../types/dashboard/dashboard";

const iconMap: Record<IDashboardAlerta['tipo'], JSX.Element> = {
  risco: <FiAlertTriangle size={22} className="text-(--textYellowColor)" />,
  sem_atualizacao: <CiTimer size={22} className="text-indigo-500" />,
  nova_mci: <CiCircleAlert size={22} className="text-sky-500" />,
  meta_atingida: <GiCheckMark size={22} className="text-emerald-500 " />,
};

const AlertsWarning: React.FC<{ alertas: IDashboardAlerta[] }> = ({ alertas }) => {
  if (alertas.length === 0) {
    return (
      <p className="text-xs text-slate-500 px-3">
        Nenhum alerta no momento
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {alertas.map((alert, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/40 transition"
        >
          {/* Ícone */}
          <div className="mt-1">
            {iconMap[alert.tipo]}
          </div>

          {/* Conteúdo */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">
              {alert.titulo}
            </span>

            <span className="text-xs text-slate-500 leading-snug">
              {alert.descricao}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsWarning;
