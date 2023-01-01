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

import formatSalary from '../utils/formatSalary';

interface SalaryLineChartProps {
    chartData: any,
    staffName: string,
}

const SalaryLineChart = ({chartData, staffName}: SalaryLineChartProps) => {

    Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title, Tooltip, ChartDataLabels)

    Chart.defaults.set('plugins.datalabels', {
        color: '#004400',
        align: 245,
        anchor: "top",
        font : {
            weight : 400,
            size: 16
        },
        formatter : function(value:any) {
            return formatSalary(value)
        },
        
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
            layout : {
                padding : {
                    top: 10,
                    bottom: 10,
                    left: 50,
                    right: 50,
                }
            },
            elements : {
                point : {
                    radius: 8,
                    hoverRadius : 12,
                    hoverBorderWidth: 3,
                },
                                
            },
            plugins: {
              title: {
                display: true,
                text: `${staffName}'s Salary`,
                font: {
                    size: 25,
                },
                color: "#000000",
                padding: 28,
              },
              legend: {
                display: false,
              },
              tooltip : {
                callbacks : {
                    label(tooltipItem) {
                        return " Salary: " + formatSalary(tooltipItem.formattedValue)
                    },
                },
                yAlign : 'bottom',
                padding : 8,
                titleFont: {
                    size: 15
                },
                bodyFont : {
                    size: 15
                },
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
                        color: "#000000",
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
                        color: "#000000",
                        padding: 2,
                        
                    },
                    beginAtZero: true,
                    suggestedMin: 0,
                }
            },
            

          }}
        />
      </div>
    )

}

export default SalaryLineChart