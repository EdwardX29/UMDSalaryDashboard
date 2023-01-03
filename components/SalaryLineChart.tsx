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
        onclick: function(e:any) {
            console.log(e)
        },
        color: '#000000',
        align: 270,
        anchor: "top",
        font : {
            weight : 400,
            size: 16
        },
        // font: function(context:any) {
        //     const width = context.chart.width;
        //     const size = Math.round(width / 88);

        //     return {
        //         weight: 400,
        //         size: size
        //     };
        // },
        formatter : function(value:any) {
            return formatSalary(value)
        },
        display: true,
        
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
                // padding(ctx, options) {
                //     const width = ctx.chart.width;
                //     const size = Math.round(width / 64);
                //     return {
                //         top: size,
                //         bottom: size,
                //         left: size*2.2,
                //         right: size*2.2
                //     }
                // },
                padding : {
                    top: 10,
                    bottom: 10,
                    left: 50,
                    right: 50
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
                    weight: "normal"
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
                yAlign : 'top',
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