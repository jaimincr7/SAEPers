import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { faGear, faPause, faCar, faDownLeftAndUpRightToCenter, faGears, faWrench, faDharmachakra, faA } from "@fortawesome/free-solid-svg-icons"
import "./index.css"
// TODO Need to make this an ENUM type
export default function SubsystemIcon(props: {subsystemName: string}){
    let icon: FontAwesomeIconProps["icon"]
    switch (props.subsystemName){
        case "Brakes":
            icon = faPause
            break
        case "Chassis":
            icon = faWrench
            break

        case "Drive Train":
            icon = faCar
            break
        
        case "Front Suspension":
            icon = faDownLeftAndUpRightToCenter
            break
        
        case "Rear Differential":
            icon = faGears
            break

        case "Rear Suspension":
            icon = faDownLeftAndUpRightToCenter
            break

        case "Steering":
            icon = faDharmachakra
            break
        default:
            icon = faGear
            break
    }

    return <FontAwesomeIcon icon={icon} size="2x" className="subsystem--icon"/>
}