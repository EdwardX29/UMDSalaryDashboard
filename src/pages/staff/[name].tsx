import { NextPage } from "next";
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import SalaryLineChart from "../../../components/SalaryLineChart";
import { useEffect, useState } from "react";

const StaffSalaryPage:NextPage = () => {

    const router = useRouter()
    const employeeName = String(router.query.name)

    const {data: salaryData, isLoading} = 
        trpc.salary.getStaffMembersSalaries
        .useQuery({employeeName: String(employeeName)})
            
    const [chartData, setChartData] = useState({})
    useEffect(() => {
        setChartData({
           labels: salaryData?.map((data) => data.year).reverse(), 
           datasets: [
             {
               label: "Salary Amount",
               data: salaryData?.map((data) => data.salaryAmount).reverse(),
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
                <title>{employeeName} not found</title>
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
            <h1 className="font-semibold text-4xl">{employeeName}</h1>
            <div>
                <h2 className="font-semibold text-3xl my-4">Salary Visualization</h2>
                <SalaryLineChart chartData={chartData} staffName={employeeName}/>
            </div>
            <div>
                <h2 className="font-semibold text-3xl my-4">Salary History</h2>
                {

                    salaryData && salaryData.map((salary) => (
                        <div className="flex flex-col">
                            <SalaryCard {...salary} />
                        </div>
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
    
    let salaryString = ""
    if (salaryAmount.toString().includes(".")) {
        const numDigitsAfterDecimal = salaryAmount.toString().split(".")[1]?.length
        if (numDigitsAfterDecimal == 2) {
            salaryString = salaryAmount.toLocaleString("en-US")
        }
        else {
            salaryString = salaryAmount.toLocaleString("en-US") + "0"
        }

    } 
    else {
        salaryString = salaryAmount.toLocaleString("en-US") + ".00"
    }
    
    salaryString = "$" + salaryString

    return (
        <div key={id} 
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
    )
}

export default StaffSalaryPage