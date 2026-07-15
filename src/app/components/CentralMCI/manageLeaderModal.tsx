'use client'
import { SlUserFollow } from "react-icons/sl";
import ManageLeaderDataTable from "./manageLeaderDataTable";
import GlobalDialog from "../utils/globalDialog";
import TriggerButton from "../utils/triggerButton";
import { ILeader } from "../../types/centralMCI/centralMCI";

interface IManageLeaderModal{
    leader:ILeader[]
}

const ManageLeaderModal: React.FC<IManageLeaderModal> = ({
    leader
}) => {
    return (
        <GlobalDialog 
        trigger={ <TriggerButton><SlUserFollow className="size-5 pointer-events-none" /></TriggerButton>}
        title="Gerenciamento de líderes"
        contentClassName="w-[95%] md:w-1/3"
        >
            <ManageLeaderDataTable leaders={leader}  />
        </GlobalDialog>
       
    );
}

export default ManageLeaderModal;