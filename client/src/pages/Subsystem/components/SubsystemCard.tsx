import "../index.css"
import SubsystemIcon from "../../../components/SubsystemIcon"
import { Interfaces } from "../../../utils/namespaces/Interfaces"
import { Link } from "react-router-dom"
interface SubsystemCardProps{
    SubsystemCardData: Interfaces.ISubsystem
}
export default function SubsystemCard(props:SubsystemCardProps){
    const {subsystem, key} = props.SubsystemCardData
    return(
        <Link to="/analysis" state={{bucketKey: key, subsystemName: subsystem}} className="subsystem--card shadows">
            <span style={{marginLeft:"15px"}}><SubsystemIcon subsystemName={subsystem} /></span>
            <div className="subsystem--title--container">
                <h4 className="subsystem--title">{subsystem}</h4>
            </div>
        </Link>
    )
}

