import Head from "next/head"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { FormEvent, useState } from "react"
import { trpc } from "../utils/trpc"
import formatSalary from "../../utils/formatSalary"
import Link from "next/link"

const Search = () => {

    const [query, setQuery] = useState("")
    const [ascendingState, setAscending] = useState("Descending")
    const [yearState, setYearState] = useState("2022")
    const [sortByState, setSortBy] = useState("Salary")

    const {data: salaries, refetch: salaryRefetch, isLoading:salariesLoading} = trpc.salary.getSalary.useQuery({
        searchQuery: query, ascending: ascendingState, yearQuery: yearState, sortBy: sortByState
    })

    const searchForSalary = async (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const salaryQuery = String(formData.get("query"))
        const yearQuery = String(formData.get("yearQuery"))
        const orderQuery = String(formData.get("orderQuery"))
        const sortQuery = String(formData.get("sortQuery"))
        setQuery(salaryQuery)
        setYearState(yearQuery)
        setAscending(orderQuery)
        setSortBy(sortQuery)
        salaryRefetch()
    } 

    return (
        <>
            <Head>
                <title>
                    UMD Salary Guide | Classic
                </title>
            </Head>

            <main className="p-8">
                <h1 className="font-semibold text-3xl">
                    Search for name, job, department
                </h1>
                <form 
                onSubmit={(e) => searchForSalary(e)}
                className="flex flex-col my-4">
                    <div className="flex flex-row items-center flex-wrap sm:justify-start justify-center">
                        <div className="flex flex-row items-center">
                            <MagnifyingGlassIcon className="w-6 h-6 mr-4 hover:cursor-pointer text-gray-500"/>
                            <input type="text" name="query" 
                            className="h-6 w-50 sm:w-64 py-4 px-2 border-2 rounded border-black focus:outline-none"
                            placeholder="Make a search..." autoComplete="off"
                            />
                        </div>
                        
                        <input type="submit" value="Search" 
                        className="ml-4 mt-2 p-2 bg-red-600 text-white 
                                    min-[384px]:mt-0 rounded-lg hover:bg-red-700"
                        />

                    </div>
                    <div className="my-4 p-4 sm:w-[50vw] md:w-[35vw]">
                        <div className="flex flex-row justify-between">
                            <label className="text-red-500">Year:</label>
                            <select
                                name="yearQuery"
                            >
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                            </select>
                        </div>
                        <div className="flex flex-row justify-between">
                            <label className="text-red-500">Order:</label>
                            <select
                                name="orderQuery"
                            >
                                <option>Descending</option>
                                <option>Ascending</option>
                            </select>
                        </div>

                        <div className="flex flex-row justify-between">
                            <label className="text-red-500">Sort by:</label>
                            <select
                                name="sortQuery"
                            >
                                <option>Salary</option>
                                <option>Employee</option>
                                <option>Title</option>
                                <option>Division</option>
                                <option>Department</option>
                            </select>
                        </div>
                    </div>


                </form>
                <ul>
                    {salariesLoading ? <span className="text-xl">Loading results 🐢...</span>
                    :
                    salaries?.map((salary) => (
                        <SalaryCard {...salary} key={salary.id}/>
                    ))}
                </ul>

            </main>
        </>
    )
}


interface SalaryCardProps  {
    id: string,
    year: string,
    salaryAmount: number,
    division: string,
    department: string,
    title: string,
    employeeName: string,
}

const SalaryCard:React.FC<SalaryCardProps> = ({id, year, salaryAmount, division, department, title, employeeName}) => {
    
    const salaryString = formatSalary(salaryAmount)
    
    return (
        <div className="flex flex-col" key={id + year}>
        <div
        className="flex flex-col 
            sm:flex-row sm:justify-between sm:items-center sm:text-6xl sm:p-8 md:p-12
            border-t border-gray-300 my-2 justify-between py-4">
            <div>
                <Link href={`/staff/${employeeName}`} className="block font-semibold text-3xl mb-4 text-red-600 hover:text-red-700 hover:underline">{employeeName}</Link>
                <ul className="list-disc list-inside">
                    <li className="text-gray-600 text-md min-[320px]:text-lg min-[400px]:text-xl sm:text-lg md:text-xl">{title}</li>
                    <li className="text-gray-600 text-md min-[320px]:text-lg min-[400px]:text-xl sm:text-lg md:text-xl">{division}</li>
                    <li className="text-gray-600 text-md min-[320px]:text-lg min-[400px]:text-xl sm:text-lg md:text-xl">{department}</li>
                </ul>
            </div>
            
            <span className="text-red-600 font-semibold text-left font-mono 
                            text-4xl min-[400px]:text-5xl my-2 md:text-6xl md:my-0">
                {
                salaryString
                }
            </span>
        </div>
        </div>
        
    )

}

export default Search