import { CiLogout } from "react-icons/ci";
import { getMe, logoutAction } from "../../actions/auth";

const iniciais = (nome: string) =>
    nome.trim().split(/\s+/).map(palavra => palavra[0]).slice(0, 2).join('').toUpperCase();

const Perfil = async () => {

    const usuario = await getMe();

    const informacoes = [
        { rotulo: 'Email', valor: usuario.email },
        { rotulo: 'Nível de acesso', valor: usuario.nivel },
        { rotulo: 'Papel', valor: usuario.role },
        { rotulo: 'Vínculo', valor: usuario.hierarquia?.nome ?? 'Acesso geral' },
        { rotulo: 'Ano ativo', valor: String(usuario.ano_ativo) },
    ];

    return (
        <section className="mx-8 text-(--textBaseColor)">
            <h1 className="font-bold">Meu perfil</h1>

            <div className="my-6 max-w-xl mx-auto">
                <div className="bg-[#F0F4F9] rounded-4xl shadow-xl p-8 flex flex-col items-center gap-6">

                    <div className="w-24 h-24 flex justify-center items-center rounded-full border-4 border-(--textYellowColor) bg-[#D9D9D9]">
                        <span className="text-4xl text-(--textBaseColor)/60">{iniciais(usuario.nome)}</span>
                    </div>

                    <div className="text-center">
                        <p className="text-xl font-semibold">{usuario.nome}</p>
                        <small className="text-(--textBaseColor)/60">{usuario.role} · {usuario.nivel}</small>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        {informacoes.map(info => (
                            <div key={info.rotulo} className="w-full bg-white rounded-3xl py-2.5 px-6 flex justify-between items-center gap-4 shadow-sm">
                                <small className="text-(--textBaseColor)/60 whitespace-nowrap">{info.rotulo}</small>
                                <span className="text-sm font-semibold text-right truncate">{info.valor}</span>
                            </div>
                        ))}
                    </div>

                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-10 py-2 rounded-3xl text-red-600 border border-red-200 bg-white hover:bg-red-50 transition shadow-sm hover:cursor-pointer"
                        >
                            <CiLogout className="size-5" />
                            Sair
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Perfil;
