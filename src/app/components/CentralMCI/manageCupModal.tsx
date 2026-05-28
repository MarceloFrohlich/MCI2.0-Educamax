import { BsTrophy } from "react-icons/bs";
import GlobalDialog from "../utils/globalDialog";
import TriggerButton from "../utils/triggerButton";
import ManageCupDataTable from "./manageCupDataTable";
import { ICup, ILeader } from "../../types/centralMCI/centralMCI";
import { IDepartamento } from "../../types/cadastros/cadastros";

interface IManageCupModal{
  leaders: ILeader[]
  copas: ICup[]
  departamentos: IDepartamento[]
}

const ManageCupModal: React.FC<IManageCupModal> = ({leaders, departamentos, copas}) => {
    return (
      <GlobalDialog
      contentClassName="w-11/12 max-h-[90vh] overflow-auto"
      title="Gerenciamento de Copas"
        trigger={ <TriggerButton children={<BsTrophy className="size-5 pointer-events-none" />} />}
      >
        <ManageCupDataTable leaders={leaders} departamentos={departamentos} copas={copas} />       

      </GlobalDialog>
    )
}

export default ManageCupModal;