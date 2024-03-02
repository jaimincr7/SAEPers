import { useEffect, useState } from "react"
import { Interfaces } from "../utils/namespaces/Interfaces";
import { dbs3Controller } from "../services/api/dbs3Controller";

export const useGetRaceFolders = () => {
    const [raceFolders, setRaceFolders] = useState<Interfaces.IRaceLog[]>([])

    class RaceFolderModifier{

        SortByName(){
            setRaceFolders((prev) => {
                const temp = [...prev].sort((a,b) => a.name.localeCompare(b.name))
                return temp
            })
        }// SortByName

        SortByDuration(){
            setRaceFolders((prev) => {
                const temp = [...prev].sort((a,b) => a.duration - b.duration)
                return temp
            })
        } // SortByDuration

        SortByDate(){
            setRaceFolders((prev) => {
                const temp = [...prev].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                return temp
            })
        } // SortByDate

    } // RaceFolderModifier

    const raceFoldermModifier = new RaceFolderModifier()

    
    useEffect(() => {
        const fetchData = async () =>{
            const data = await dbs3Controller.GetRaceFolders()
            setRaceFolders(data)
        }

        fetchData()
    },[]) // useEffect

    return {
        raceFolders, raceFoldermModifier 
    }
}
