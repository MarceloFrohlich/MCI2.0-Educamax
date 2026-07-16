'use client'

import { FiCheck, FiX } from "react-icons/fi";

const criterios = [
    { rotulo: 'Mínimo de 8 caracteres', valida: (senha: string) => senha.length >= 8 },
    { rotulo: 'Uma letra maiúscula', valida: (senha: string) => /[A-Z]/.test(senha) },
    { rotulo: 'Uma letra minúscula', valida: (senha: string) => /[a-z]/.test(senha) },
    { rotulo: 'Um número', valida: (senha: string) => /[0-9]/.test(senha) },
    { rotulo: 'Um caractere especial (!@#$%...)', valida: (senha: string) => /[^A-Za-z0-9]/.test(senha) },
];

export function senhaAtendeCriterios(senha: string): boolean {
    return criterios.every(criterio => criterio.valida(senha));
}

const CriteriosSenha: React.FC<{
    senha: string,
    visivel: boolean
}> = ({ senha, visivel }) => {

    if (!visivel) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col gap-1.5 animate-in fade-in-0 slide-in-from-top-1 duration-200">
            {criterios.map(criterio => {
                const atendido = criterio.valida(senha);

                return (
                    <span
                        key={criterio.rotulo}
                        className={`flex items-center gap-2 text-xs transition-colors duration-300 ${atendido ? 'text-green-600' : 'text-red-500'}`}
                    >
                        {atendido ? <FiCheck className="shrink-0" /> : <FiX className="shrink-0" />}
                        {criterio.rotulo}
                    </span>
                );
            })}
        </div>
    );
};

export default CriteriosSenha;
