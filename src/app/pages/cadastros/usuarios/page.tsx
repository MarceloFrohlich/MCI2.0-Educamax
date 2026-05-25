'use client'

import CreateEditUserModal from "../../../components/cadastro/usuarios/createEditUserModal"
import ManageUsersDataTable from "../../../components/cadastro/usuarios/manageUsersDataTable"

const CadastroUsuarios: React.FC = () => {
    return (
        <section className="mx-8 text-(--textBaseColor) relative z-50">
            <h1 className="font-bold">Cadastro de usuários</h1>

            <div className="my-4 w-full flex justify-end">
                <CreateEditUserModal />
            </div>

            <div className="max-h-[50%]">
                <ManageUsersDataTable />
            </div>
        </section>
    )
}

export default CadastroUsuarios