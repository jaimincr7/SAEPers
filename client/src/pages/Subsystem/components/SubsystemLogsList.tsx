import { Interfaces } from "../../../utils/namespaces/Interfaces";
import SubsystemCard from "./SubsystemCard";

interface SubsystemListProps{
    SubsystemListData: Interfaces.ISubsystem[]
}
export default function SubsystemLogsList(props: SubsystemListProps){
    const subsystemLogs = props.SubsystemListData
    return(
        <div id="subsystem--log--list">
            {subsystemLogs.map(obj => <SubsystemCard key={obj.key} SubsystemCardData={obj}/>)}
        </div>
    )
    

}