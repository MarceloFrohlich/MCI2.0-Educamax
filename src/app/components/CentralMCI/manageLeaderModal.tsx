import { SlUserFollow } from "react-icons/sl";

import ManageLeaderDataTable from "./manageLeaderDataTable";
import GlobalDialog from "../utils/globalDialog";
import TriggerButton from "../utils/triggerButton";


const ManageLeaderModal: React.FC = () => {
    return (
        <GlobalDialog 
        trigger={ <TriggerButton children={<SlUserFollow className="size-5 pointer-events-none" />} />} 
        title="Gerenciamento de líderes"
        contentClassName="w-1/2"
        >
            <ManageLeaderDataTable />
        </GlobalDialog>
       
    );
}

export default ManageLeaderModal;