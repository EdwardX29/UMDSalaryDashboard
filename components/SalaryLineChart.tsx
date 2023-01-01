import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { 
    Chart, 
    LineElement, 
    CategoryScale, 
    LinearScale, 
    PointElement,
    Legend,
    Title,
    Tooltip,
} 
from 'chart.js'

interface SalaryLineChartProps {
    chartData: any,
    staffName: string,
}

const SalaryLineChart = ({chartData, staffName}: SalaryLineChartProps) => {

    Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title, Tooltip, ChartDataLabels)

    Chart.defaults.set('plugins.datalabels', {
        color: '#000000',
        align: 225,
        anchor: "top",
        font : {
            weight : 400,
            size: 16
        },
        formatter : function(value:any) {
            return "$" + (value).toLocaleString("en-US")
        }
      })

    return (
        <div className="chart-container">
        <Line
          data={chartData}
          plugins={
            [ChartDataLabels]
          }
          options={{
            responsive: true,
            elements : {
                point : {
                    radius: 8,
                    hoverRadius : 12,
                    hoverBorderWidth: 3
                },
                
            },
            plugins: {
              title: {
                display: true,
                text: `${staffName}'s Salary`,
                font: {
                    size: 25,
                },
                color: "#333333",
                padding: 28,
              },
              legend: {
                display: false,
              },
              tooltip : {
                callbacks : {
                    label(tooltipItem) {
                        return  "Salary: $" + tooltipItem.formattedValue
                    },
                },
                yAlign : 'bottom',
                padding : 12,
                titleFont: {
                    size: 15
                },
                bodyFont : {
                    size: 15
                }
              },
            
            },
            scales: {
                x : {
                    title : {
                        display: true, 
                        text: "Years",
                        font: {
                            size: 22,
                            family: 'Helvetica',
                        },
                        color: "#333333",
                        padding: 2,
                    }
                },
                y : {
                    title : {
                        display : true,
                        text: "Salary (in $)",
                        font: {
                            size: 22,
                            family: 'Helvetica',
                        },
                        color: "#333333",
                        padding: 2,
                        
                    },
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 1_000_000
                }
            },
            

          }}
        />
      </div>
    )

}

export default SalaryLineChart