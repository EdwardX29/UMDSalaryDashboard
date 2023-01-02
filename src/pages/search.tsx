import Head from "next/head"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { FormEvent, useState } from "react"
import { trpc } from "../utils/trpc"

const Search = () => {

    const [query, setQuery] = useState("Computer Science")
    const [ascendingState, setAscending] = useState("Ascending")
    const [yearState, setYearState] = useState("2022")
    const [sortByState, setSortBy] = useState("Salary")

    const {data: salaries, refetch: salaryRefetch} = trpc.salary.getSalary.useQuery({
        searchQuery: query, ascending: ascendingState, yearQuery: yearState, sortBy: sortByState
    })

    const searchForSalary = async (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const salaryQuery = String(formData.get("query"))
        setQuery(salaryQuery)
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
                    <div className="flex flex-row items-center">
                        <MagnifyingGlassIcon className="w-6 h-6 mr-4 hover:cursor-pointer text-gray-500"/>
                        <input type="text" name="query" 
                        className="h-6 w-64 py-4 px-2 border-2 rounded border-black focus:outline-none"
                        placeholder="Make a search..." autoComplete="off"
                        />
                    </div>
                    <div className="my-4">
                        <div>
                            <label>Order:</label>
                            <select
                                value={ascendingState}
                                onChange={(e) => setAscending(e.target.value)}
                            >
                                <option>Ascending</option>
                                <option>Descending</option>
                            </select>
                        </div>
                        <div>
                            <label>Year:</label>
                            <select
                                value={yearState}
                                onChange={(e) => setYearState(e.target.value)}
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
                        <div>
                            <label>Sort by:</label>
                            <select
                                value={sortByState}
                                onChange={(e) => setSortBy(e.target.value)}
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
                    {JSON.stringify(salaries)}
                </ul>

            </main>
        </>
    )
}

export default Search