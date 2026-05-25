import { BsTrophy } from "react-icons/bs";
import GlobalDialog from "../utils/globalDialog";
import TriggerButton from "../utils/triggerButton";
import ManageCupDataTable from "./manageCupDataTable";

const ManageCupModal: React.FC = () => {
    return (
      <GlobalDialog
      contentClassName="w-11/12 max-h-[90vh] overflow-auto"
      title="Gerenciamento de Copas"
        trigger={ <TriggerButton children={<BsTrophy className="size-5 pointer-events-none" />} />}
      >
        <ManageCupDataTable />       

      </GlobalDialog>
    )
}

export default ManageCupModal;