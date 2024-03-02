import { Interfaces } from "../../../utils/namespaces/Interfaces"
import RaceLog from "./RaceLog"

interface RaceLogListProps{
    RaceLogListData: Interfaces.IRaceLog[]
}
export default function RaceLogList(props:RaceLogListProps){
    const raceFolders = props.RaceLogListData

    return(
        <div id="raceloglist">
            {raceFolders.map((obj) => obj && <RaceLog key={obj.id} RaceLogData={obj}/>)}
        </div>
    )
}