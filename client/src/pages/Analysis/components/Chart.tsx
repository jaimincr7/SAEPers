// BarChart.tsx
import "../index.css"
import { Interfaces } from '../../../utils/namespaces/Interfaces';
import { SetStateAction } from "react";
import { Dispatch } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js';

import {Bar, Line, Pie} from "react-chartjs-2"

interface ChartProps {
  ChartData: Interfaces.IChart,
  analysisMode: AnalysisMode
  setChartMode: Dispatch<SetStateAction<AnalysisMode>>
}

enum AnalysisMode {
  Line = 1,
  Bar,
  Pie
}

export default function Chart(props:ChartProps){
  ChartJS.register(
    ArcElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  )

  const data = props.ChartData
  const chartMode = props.analysisMode
  const config = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Subsystems Multiline Chart'
        }
      }
  };

  const fakeData = {
    datasets: [{
      data: [0],
      label: "category"
    }],
    labels: [""],
  }

  const Graph = () => {
    switch (chartMode){
      case AnalysisMode.Line:
        return <Line options={config}  data={data.datasets.length == 0 ? fakeData: data}/>
      case AnalysisMode.Bar:
        return <Bar data={data}/>
      case AnalysisMode.Pie:
        return <Pie style={{maxHeight:"550px"}} data={data}/>
    }
  }

  return (
    <div id="chart--container">
        <Graph />
    </div>
  );
}

