import { getAllDepartamentos } from "../../../actions/cadastros/departamentos"
import { getAllFiliais } from "../../../actions/cadastros/filiais"
import { getAllFranqueadoras } from "../../../actions/cadastros/franqueadoras"
import { getAllUsuarios } from "../../../actions/cadastros/usuarios"
import CreateEditUserModal from "../../../components/cadastro/usuarios/createEditUserModal"
import ManageUsersDataTable from "../../../components/cadastro/usuarios/manageUsersDataTable"
import { getSessao } from "../../../services/sessao"

const CadastroUsuarios: React.FC = async () => {

    const usuarios = await getAllUsuarios()
    const departamentos = await getAllDepartamentos()
    const filiais = await getAllFiliais()
    const franqueadoras = await getAllFranqueadoras()
    const sessao = await getSessao()

    return (
        <section className="mx-8 text-(--textBaseColor)">
            <h1 className="font-bold">Cadastro de usuários</h1>

            <div className="my-4 w-full flex justify-end">
                <CreateEditUserModal sessao={sessao} departamentos={departamentos} filiais={filiais} franqueadoras={franqueadoras} />
            </div>

            <div className="max-h-[50%]">
                <ManageUsersDataTable sessao={sessao} departamentos={departamentos} filiais={filiais} franqueadoras={franqueadoras} usuarios={usuarios}/>
            </div>
        </section>
    )
}

export default CadastroUsuarios