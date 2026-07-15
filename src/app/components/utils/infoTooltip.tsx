import { CiCircleInfo } from "react-icons/ci";

const InfoTooltip: React.FC<{
    texto: string,
    posicao?: 'centro' | 'direita'
}> = ({ texto, posicao = 'centro' }) => {
    return (
        <span className="relative group inline-flex align-middle ms-1.5">
            <CiCircleInfo className="size-4 text-slate-400 group-hover:text-slate-600 cursor-help transition-colors" />

            <span className={`
                invisible opacity-0 group-hover:visible group-hover:opacity-100
                transition-opacity duration-300
                absolute top-6 z-50 w-72 p-3 rounded-xl
                bg-slate-900/95 text-white text-[11px] font-normal leading-4
                shadow-xl whitespace-normal
                ${posicao === 'direita' ? 'right-0' : 'left-1/2 -translate-x-1/2'}
            `}>
                {texto}
            </span>
        </span>
    );
};

export default InfoTooltip;
