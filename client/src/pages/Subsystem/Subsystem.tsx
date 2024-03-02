import { useLocation } from "react-router-dom"
import { useGetRaceFolderContents } from "../../hooks/useGetRaceFolderContents"
import SubsystemLogsList from "./components/SubsystemLogsList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons"

export default function Subsytem(){
    const location = useLocation()
    const bucketKey = location.state && location.state.bucketKey
    const raceName = location.state && location.state.raceName
    const {subsystemLogs} = useGetRaceFolderContents(bucketKey)
    return(
        <div>
            <h2> {<FontAwesomeIcon icon={faFlagCheckered} style={{paddingRight: "7px"}}/>} {raceName}</h2>
            <SubsystemLogsList SubsystemListData={subsystemLogs} />
        </div>
    )
}