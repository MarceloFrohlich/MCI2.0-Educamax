'use client'

import CreateEditFranqueadoraModal from "../../../components/cadastro/franqueadoras/createEditFranqueadoraModal"
import ManageFranqueadorasDataTable from "../../../components/cadastro/franqueadoras/manageFranqueadorasDataTable"


const CadastroFranqueadora: React.FC = () => {
    return (
        <section className="mx-8 text-(--textBaseColor) relative z-50">
            <h1 className="font-bold">Cadastro de Franqueadoras</h1>

            <div className="my-4 w-full flex justify-end">
                <CreateEditFranqueadoraModal />
            </div>

            <div className="max-h-[50%]">
                <ManageFranqueadorasDataTable />
            </div>
        </section>
    )
}

export default CadastroFranqueadora