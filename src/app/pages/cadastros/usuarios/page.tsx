import { getAllDepartamentos } from "../../../actions/cadastros/departamentos"
import { getAllFiliais } from "../../../actions/cadastros/filiais"
import { getAllFranqueadoras } from "../../../actions/cadastros/franqueadoras"
import { getAllUsuarios } from "../../../actions/cadastros/usuarios"
import CreateEditUserModal from "../../../components/cadastro/usuarios/createEditUserModal"
import ManageUsersDataTable from "../../../components/cadastro/usuarios/manageUsersDataTable"

const CadastroUsuarios: React.FC = async () => {

    const usuarios = await getAllUsuarios()
    const departamentos = await getAllDepartamentos()
    const filiais = await getAllFiliais()
    const franqueadoras = await getAllFranqueadoras()

    return (
        <section className="mx-8 text-(--textBaseColor) relative z-50">
            <h1 className="font-bold">Cadastro de usuários</h1>

            <div className="my-4 w-full flex justify-end">
                <CreateEditUserModal departamentos={departamentos} filiais={filiais} franqueadoras={franqueadoras} />
            </div>

            <div className="max-h-[50%]">
                <ManageUsersDataTable departamentos={departamentos} filiais={filiais} franqueadoras={franqueadoras} usuarios={usuarios}/>
            </div>
        </section>
    )
}

export default CadastroUsuarios