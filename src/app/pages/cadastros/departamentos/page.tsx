'use client'

import CreateEditDepartamentoModal from "../../../components/cadastro/departamento/createEditDepartamentoModal"
import ManageDepartamentosDataTable from "../../../components/cadastro/departamento/manageDepartamentoDataTable"
import CreateEditFilialModal from "../../../components/cadastro/filial/createEditFilialModal"
import ManageFilialDataTable from "../../../components/cadastro/filial/manageFilialDataTable"
import { filiaisMock } from "../../../mocks/filiais"
import { franqueadorasMock } from "../../../mocks/franqueadoras"



const CadastroDepartamento: React.FC = () => {


    const filiais = filiaisMock

    return (
        <section className="mx-8 text-(--textBaseColor) relative z-50">
            <h1 className="font-bold">Cadastro de Departamentos</h1>

            <div className="my-4 w-full flex justify-end">
                <CreateEditDepartamentoModal filiais={filiais}/>
            </div>

            <div className="max-h-[50%]">
                <ManageDepartamentosDataTable filiais={filiais} />
            </div>
        </section>
    )
}

export default CadastroDepartamento