import { NextPage } from "next";
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";
import SalaryLineChart from "../../../components/SalaryLineChart";
import { useEffect, useState } from "react";

import formatSalary from "../../../utils/formatSalary";

const StaffSalaryPage:NextPage = () => {

    const router = useRouter()
    const employeeName = String(router.query.name)

    const {data: salaryData, isLoading} = 
        trpc.salary.getStaffMembersSalaries
        .useQuery({employeeName: String(employeeName)})
            
    const [chartData, setChartData] = useState({})
    useEffect(() => {
        const years = salaryData?.map((data) => data.year).reverse()
        const salaries = salaryData?.map((data) => data.salaryAmount).reverse()

        let replaceIndex = 1
        if (years != undefined && salaries != undefined) {
            for (let i = 1; years && i < years.length; i++) {
                
                if (years[i] == years[i-1]) {
                    salaries[i-1] = salaries[i-1] + salaries[i]
                }
                else {
                    years[replaceIndex] = years[i]
                    salaries[replaceIndex] = salaries[i]
                    replaceIndex++;
                }

            }
        }
        years?.splice(replaceIndex, years.length - replaceIndex)
        salaries?.splice(replaceIndex, salaries.length - replaceIndex)

        setChartData({
           labels: years,
           datasets: [
             {
               label: "Salary Amount",
               data: salaries,
               backgroundColor: [
                    "#11ffbb"
               ],
               borderColor: "#00BB11",
               borderWidth: 2,

               
             }
           ],
       })
       

    }, [salaryData])


    if (!salaryData || salaryData.length == 0 || isLoading) {
        return (
            <>
            <Head>
                <title>Employee Not found</title>
            </Head>
            <main className="p-8 flex flex-col justify-center align-center items-center">
                <h1 className="font-semibold text-3xl mb-8">{employeeName} not found</h1>
                <Image src="/confusedterp.png" width={144} height={144} alt="confused terp" className="block"/>
            </main>
            </>
            
        )
    }




    return (
        <>
        <Head>
            <title>Salary - {employeeName}</title>
        </Head>
        <main className="p-8">
            <div>
            <h1 className="font-semibold text-5xl">{employeeName}</h1>
            <div className="my-12">
                <h2 className="font-semibold text-4xl my-4">Salary Visualization</h2>
                <SalaryLineChart chartData={chartData} staffName={employeeName}/>
            </div>
            <div className="my-12">
                <h2 className="font-semibold text-4xl my-4">Salary History</h2>
                {

                    salaryData && salaryData.map((salary) => (
                            <SalaryCard {...salary} key={salary.id}/>
                    ))
                }
            </div>
           
            </div>
        </main>
        </>

    )


}


interface salaryCardProps {
    id: string; 
    year: string; 
    salaryAmount: number; 
    division: string; 
    department: string; 
    title: string; 
    employeeName: string;
}

const SalaryCard:React.FC<salaryCardProps> = ({id, year, salaryAmount, division, department, title, employeeName}) => {
    
    const salaryString = formatSalary(salaryAmount)

    return (
        <div className="flex flex-col">

        <div id={year}
        className="flex flex-row border-t border-gray-300 my-2 items-center py-6 justify-between px-4">
            <div>
                <h3 className="font-semibold text-2xl mb-4">{year}</h3>
                <ul className="list-disc list-inside">
                    <li className="text-xl">{title}</li>
                    <li className="text-xl">{division}</li>
                    <li className="text-xl">{department}</li>
                </ul>
            </div>
            
            <span className="text-red-600 text-5xl font-bold text-left font-mono">
                {
                salaryString
                }
            </span>
        </div>
        </div>
    )
}

export default StaffSalaryPage