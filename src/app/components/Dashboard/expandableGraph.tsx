'use client'

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const ExpandableGraph: React.FC<{
    titulo: string,
    children: React.ReactNode,
    expandido?: React.ReactNode
}> = ({ titulo, children, expandido }) => {
    const [aberto, setAberto] = useState(false);

    useEffect(() => {
        if (!aberto) return;

        const aoTeclar = (evento: KeyboardEvent) => {
            if (evento.key === 'Escape') setAberto(false);
        };

        window.addEventListener('keydown', aoTeclar);
        return () => window.removeEventListener('keydown', aoTeclar);
    }, [aberto]);

    return (
        <>
            <div
                onClick={() => setAberto(true)}
                title="Clique para ampliar"
                className="h-full cursor-pointer"
            >
                {children}
            </div>

            {aberto && (
                <div
                    onClick={() => setAberto(false)}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 animate-in fade-in-0 duration-300"
                >
                    <div
                        onClick={evento => evento.stopPropagation()}
                        className="w-[80vw] h-[80vh] bg-[#F0F4F9] rounded-4xl shadow-2xl p-8 flex flex-col animate-in fade-in-0 zoom-in-95 duration-300"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="font-semibold text-(--textBaseColor)">{titulo}</h1>
                            <FiX
                                onClick={() => setAberto(false)}
                                className="size-6 text-slate-500 hover:text-slate-700 cursor-pointer"
                            />
                        </div>

                        <div className="flex-1 min-h-0">
                            {expandido ?? children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpandableGraph;
