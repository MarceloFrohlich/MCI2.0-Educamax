import { getAllDepartamentos } from "../../../actions/cadastros/departamentos"
import { getAllFiliais } from "../../../actions/cadastros/filiais"
import CreateEditDepartamentoModal from "../../../components/cadastro/departamento/createEditDepartamentoModal"
import ManageDepartamentosDataTable from "../../../components/cadastro/departamento/manageDepartamentoDataTable"

const CadastroDepartamento: React.FC = async () => {

    const departamentos = await getAllDepartamentos()
    const filiais = await getAllFiliais()

    return (
        <section className="mx-8 text-(--textBaseColor)">
            <h1 className="font-bold">Cadastro de Departamentos</h1>

            <div className="my-4 w-full flex justify-end">
                <CreateEditDepartamentoModal filiais={filiais}/>
            </div>

            <div className="max-h-[50%]">
                <ManageDepartamentosDataTable filiais={filiais} departamentos={departamentos} />
            </div>
        </section>
    )
}

export default CadastroDepartamento