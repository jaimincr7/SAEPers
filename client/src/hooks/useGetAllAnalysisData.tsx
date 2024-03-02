import {useState, useEffect} from "react"
import { dbs3Controller } from "../services/api/dbs3Controller"
import { Interfaces } from "../utils/namespaces/Interfaces"


export const useGetAllAnalysisData = (bucketKey: string) => {
    const [graphData, setGraphData] = useState<Interfaces.IChart>()

    useEffect(() => {
        const fetchData = async () => {
            const subsystemLogs: Interfaces.ISubsystem[] = await dbs3Controller.GetRaceFolderContents(bucketKey)
            const temp = subsystemLogs.map( async (subsystem) => {
                const data = await dbs3Controller.GetAnalysisData(subsystem.key)
                return data
            }) // temp

            const dataJSONArr = await Promise.all(temp)
            const chartData: Interfaces.IChart = {
                labels: dataJSONArr[0].data.map(data => data.horizontalLabel),
                datasets: dataJSONArr.map(dataJSON => ({
                    subsystem: dataJSON.subsystem,
                    label: dataJSON.mainLabel,
                    data: dataJSON.data.map((data) => data.value),
                    backgroundColor: getRandomRGB(dataJSON.subsystem),
                    borderColor: getRandomRGB(dataJSON.subsystem),
                    borderWidth: 2,
                }) )
            } // chartData

            setGraphData(chartData)

            
        } // fetchData
        fetchData()

    },[]) // useEffect

    return {graphData}
}

const subsystemColorPairs: {[subsystemName: string]:string} = {
    "Brakes": "#1B998B ",
    "Chassis": "#1B2CC1",
    "Drive Train": "#f46036",
    "Front Suspension": "#AF9164",
    "Rear Differential":"#80a4ed",
    "Rear Suspension": "#B3B6B7",
    "Steering": "#F4ACB7"
}

function getRandomRGB(subsystem: string) {
    const color = subsystemColorPairs[subsystem]
    return color
    
  }