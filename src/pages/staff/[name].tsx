import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";


const StaffSalaryPage:NextPage = () => {

    const router = useRouter()
    const employeeName = String(router.query.name)

    const {data: salaryData, refetch: salaryDataRefetch} = 
        trpc.salary.getStaffMembersSalaries
        .useQuery({employeeName: String(employeeName)})

    return (
        <main>
            <h1>{employeeName}</h1>


            {
                salaryData && salaryData.map((salary) => (
                    <SalaryCard {...salary} />
                ))
            }
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
        className="flex flex-row border-t-2 border-gray-200 my-2 items-center">
            <div>
                <h3 className="font-semibold text-3xl">{year}</h3>
                <ul>
                    <li>{division}</li>
                    <li>{department}</li>
                    <li>{title}</li>
                </ul>
            </div>
            
            <span className="text-red-600 text-4xl font-bold text-left">
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