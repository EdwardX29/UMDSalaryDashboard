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
            <h1 className="font-semibold text-4xl">{employeeName}</h1>

            <h2 className="font-semibold text-2xl">Salary Visualization</h2>

            <h2 className="font-semibold text-2xl">Salary History</h2>
            {

                salaryData && salaryData.map((salary) => (
                    <div className="flex flex-col">
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
        className="flex flex-row border-t border-gray-300 my-2 items-center py-6 justify-between px-4">
            <div>
                <h3 className="font-semibold text-3xl mb-4">{year}</h3>
                <ul className="list-disc list-inside">
                    <li className="text-xl">{title}</li>
                    <li className="text-xl">{division}</li>
                    <li className="text-xl">{department}</li>
                </ul>
            </div>
            
            <span className="text-red-600 text-5xl font-bold text-left font-mono">
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