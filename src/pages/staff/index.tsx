import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { trpc } from "../../utils/trpc"
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'


const StaffHome:NextPage = () => {

    const [query, setQuery] = useState("")

    const {data: staffMembers, refetch: staffMemberRefetch} = 
        trpc.salary.searchStaffMember.useQuery({nameQuery: query})


    const searchForStaff = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const staffQuery = String(formData.get("query"))
        setQuery(staffQuery)
        staffMemberRefetch()
    }
    return (
        <>
        <Head>
            <title>UMD Salary Guide | Staff</title>
        </Head>

        <main className="p-8">

            <h1 className="font-semibold text-3xl">Seach by staff member</h1>

            <form
                onSubmit={(e) => searchForStaff(e)}
                className="flex flex-row items-center my-4"
            >   
                <MagnifyingGlassIcon className="w-6 h-6 mr-4 hover:cursor-pointer text-gray-500"/>
                <input type="text" name="query" 
                    className="h-6 w-64 py-4 px-2 border-2 rounded border-black focus:outline-none"
                    placeholder="Search for staff (eg: Bailey)" autoComplete="off"
                />
            </form>

            <ul>
                {
                query !== "" && 
                <>
                <h2 className="text-xl font-medium">
                    Search results for {" "}
                    <strong className="text-red-600 font-semibold text-2xl">&quot;{query}&quot;</strong>
                </h2>
                <h2>
                    {staffMembers && staffMembers.length + " results"} 
                </h2>
                </>
                }
                {
                    staffMembers && staffMembers.map((member) => (
                        <StaffCard {...member} key={member.name}/>
                    ))
                }
            </ul>
        </main>
        </>
    )
}

interface StaffSalary {
    year: string,
    division: string,
    department: string,
    title: string,
}

interface StaffCardProps {
    name: string,
    salaries: StaffSalary[]
}

const StaffCard:React.FC<StaffCardProps> = ({name, salaries}) => {

    const yearsSet = new Set<string>()
    const divisionSet = new Set<string>()
    const departmentSet  = new Set<string>()
    const titleSet = new Set<string>()

    salaries.forEach((salary) => {
        yearsSet.add(salary.year)
        divisionSet.add(salary.division)
        departmentSet.add(salary.department)
        titleSet.add(salary.title)
    })

    const years = Array.from(yearsSet)
    const divisions = Array.from(divisionSet)
    const departments = Array.from(departmentSet)
    const titles = Array.from(titleSet)

    return (
        <div className="my-2 border-t p-4 rounded mt-12">
            <Link href={`/staff/${name}/`} 
                className="text-red-500 mb-4 inline-block text-2xl font-semibold hover:text-red-700 hover:underline"
                target="_blank"
            >
                {name}
            </Link>
            <p>
                Titles:
                {
                    titles.map((title, i) => (
                        (
                        i + 1 != titles.length ? 
                        <>{" " + title},</> :
                        <>{" " + title}</>
                        )
                    ))
                }
            </p>
            <p>
                Years: 
                {years.map((year, i) => (
                    (
                        i + 1!= years.length ? 
                        <>{" " + year},</> :
                        <>{" " + year}</>
                    )
                ))}
            </p>
            <p>
                Divisions:
                {
                    divisions.map((division, i) => (
                        (
                            i + 1!= divisions.length ? 
                            <>{" " + division},</> :
                            <>{" " + division}</>
                        )
                    ))
                }
            </p>
            <p>
                Departments:
                {
                    departments.map((department, i) => (
                        (
                            i + 1!= departments.length ? 
                            <>{" " + department},</> :
                            <>{" " + department}</>
                        )
                    ))
                }
            </p>
        </div>
    )
}


export default StaffHome