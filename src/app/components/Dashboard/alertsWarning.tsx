'use client'

import { FiAlertTriangle } from "react-icons/fi";
import { CiCircleAlert, CiTimer } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import { alertwarnings } from "../../mocks/mocks";
import { JSX } from "react";


type AlertIconType = "success" | "warning" | "alert" | "reunion";

const iconMap: Record<AlertIconType, JSX.Element> = {
  success: <GiCheckMark size={22} className="text-emerald-500 " />,
  warning: <FiAlertTriangle size={22} className="text-(--textYellowColor)" />,
  alert: <CiCircleAlert size={22} className="text-sky-500" />,
  reunion: <CiTimer size={22} className="text-indigo-500" />,
};

const AlertsWarning: React.FC = () => {
  return (
    <div className="flex flex-col gap-0">
      {alertwarnings.map(alert => (
        <div
          key={alert.id}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/40 transition"
        >
          {/* Ícone */}
          <div className="mt-1">
            {iconMap[alert.icon as AlertIconType]}
          </div>

          {/* Conteúdo */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">
              {alert.title}
            </span>

            <span className="text-xs text-slate-500 leading-snug">
              {alert.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsWarning;
