'use client'

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { trocarAnoAction } from "../../actions/auth";

const SeletorAno: React.FC<{ anoAtivo: number; anos: number[] }> = ({ anoAtivo, anos }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [ano, setAno] = useState(anoAtivo);

    const aoTrocarAno = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        const novoAno = Number(evento.target.value);
        const anoAnterior = ano;
        setAno(novoAno);

        startTransition(async () => {
            const resultado = await trocarAnoAction(novoAno);

            if (resultado.success) {
                router.refresh();
            } else {
                setAno(anoAnterior);
            }
        });
    };

    return (
        <select
            value={ano}
            onChange={aoTrocarAno}
            disabled={isPending}
            className="bg-[#F1FAFF] rounded-lg py-2 px-4 text-sm font-semibold shadow-xl hover:cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
            {anos.map((anoOpcao) => (
                <option key={anoOpcao} value={anoOpcao}>{anoOpcao}</option>
            ))}
        </select>
    );
};

export default SeletorAno;
