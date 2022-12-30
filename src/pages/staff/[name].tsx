import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";


const StaffSalaryPage:NextPage = () => {

    const router = useRouter()
    const employeeName = String(router.query.name)

    const {data: salaryData} = 
        trpc.salary.getStaffMembersSalaries
        .useQuery({employeeName: String(employeeName)})

    return (
        <main className="p-8">
            <div>
            <h1 className="font-semibold text-3xl">{employeeName}</h1>

            <h2 className="font-semibold text-2xl">Salary Visualization</h2>

            <h2 className="font-semibold text-2xl">Salary History</h2>
            {

                salaryData && salaryData.map((salary) => (
                    <div className="w-1/2">
                        <SalaryCard {...salary} />
                    </div>
                ))
            }
            </div>


        </main>

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
    return (
        <div key={id} 
        className="flex flex-row border-t-2 border-gray-300 my-2 items-center py-2">
            <div>
                <h3 className="font-semibold text-3xl mb-4">{year}</h3>
                <ul className="list-disc list-inside">
                    <li className="">{title}</li>
                    <li className="">{division}</li>
                    <li>{department}</li>
                </ul>
            </div>
            
            <span className="text-red-600 text-5xl font-bold text-left font-sans">
                {
                    salaryAmount.toString().includes(".") ?
                   `$${salaryAmount.toLocaleString("en-US")}` :
                   `$${salaryAmount.toLocaleString("en-US") + ".00"}`
                }
            </span>
        </div>
    )
}

export default StaffSalaryPage