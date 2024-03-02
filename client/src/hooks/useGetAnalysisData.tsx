import { useEffect, useState } from "react";
import { Interfaces } from "../utils/namespaces/Interfaces";
import { dbs3Controller } from "../services/api/dbs3Controller";
import { useNavigate } from "react-router-dom";

export const useGetAnalysisData = (bucketKey: string | undefined) => {
    const [graphData, setGraphData] = useState<Interfaces.IChart>()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () =>{
          if (bucketKey){
            const json = await dbs3Controller.GetAnalysisData(bucketKey)

            setGraphData({
                labels: json.data.map(data => data.horizontalLabel),
                datasets: [
                  {
                    subsystem: json.subsystem,
                    label: json.mainLabel,
                    data: json.data.map((data) => data.value),
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 2,
                  },
                ],
              })
          } else{
            // handles error
            // navigates to no page
            navigate("/*")
            
          }

        }
        fetchData()
        
    },[])
    return {graphData, setGraphData}
}