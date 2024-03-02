
import { useEffect, useState } from "react"
import { Interfaces } from "../utils/namespaces/Interfaces"
import { dbs3Controller } from "../services/api/dbs3Controller"
import { useNavigate } from "react-router-dom";


export const useGetRaceFolderContents = (bucketKey:string | undefined) =>{
    const [subsystemLogs, setSubsystemLogs] = useState<Interfaces.ISubsystem[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () =>{
            if (bucketKey){
                const json = await dbs3Controller.GetRaceFolderContents(bucketKey)
                setSubsystemLogs(json)
            } else{
                // handles error
                // handle error here
                navigate("/*")

            }

        }
    

        fetchData()
    },[])

    return {subsystemLogs, setSubsystemLogs}
}