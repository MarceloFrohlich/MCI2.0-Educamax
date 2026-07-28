import { BsTrophy } from "react-icons/bs";
import GlobalDialog from "../utils/globalDialog";
import TriggerButton from "../utils/triggerButton";
import ManageCupDataTable from "./manageCupDataTable";
import { ICup } from "../../types/centralMCI/centralMCI";
import { IDepartamento } from "../../types/cadastros/cadastros";

interface IManageCupModal{
  copas: ICup[]
  departamentos: IDepartamento[]
}

const ManageCupModal: React.FC<IManageCupModal> = ({departamentos, copas}) => {
    return (
      <GlobalDialog
      contentClassName="w-11/12 max-h-[90vh] overflow-auto"
      title="Gerenciamento de Copas"
        trigger={ <TriggerButton><BsTrophy className="size-5 pointer-events-none" /></TriggerButton>}
      >
        <ManageCupDataTable departamentos={departamentos} copas={copas} />

      </GlobalDialog>
    )
}

export default ManageCupModal;