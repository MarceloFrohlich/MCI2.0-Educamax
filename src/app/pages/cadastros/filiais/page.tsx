import { getAllFiliais } from "../../../actions/cadastros/filiais"
import { getAllFranqueadoras } from "../../../actions/cadastros/franqueadoras"
import CreateEditFilialModal from "../../../components/cadastro/filial/createEditFilialModal"
import ManageFilialDataTable from "../../../components/cadastro/filial/manageFilialDataTable"

const CadastroFilial: React.FC = async () => {

    const franqueadoras = await getAllFranqueadoras()
    const filiais = await getAllFiliais();

    return (
        <section className="mx-8 text-(--textBaseColor) relative z-50">
            <h1 className="font-bold">Cadastro de Filiais</h1>

            <div className="my-4 w-full flex justify-end">
                <CreateEditFilialModal franqueadoras={franqueadoras} />
            </div>

            <div className="max-h-[50%]">
                <ManageFilialDataTable franqueadoras={franqueadoras} filiais={filiais} />
            </div>
        </section>
    )
}

export default CadastroFilial