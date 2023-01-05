import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const salariesRouter = router({

    searchStaffMember: publicProcedure
        .input(z.object({nameQuery: z.string()}))
        .query(async ({ctx, input}) => {
            if (input.nameQuery !== "") {
                return await ctx.prisma.employee.findMany({
                    orderBy : [
                        {
                            name: "asc"
                        }
                    ],
                    where : {
                        name: {
                            contains: input.nameQuery,
                            mode : 'insensitive'
                        },
                    },
                    select : {
                        name: true,
                        salaries: {
                            select: {
                                year: true,
                                division: true,
                                department: true,
                                title: true,
                            }
                        }
                    }
                })
            }
            else return []
        }),


    getStaffMembersSalaries : publicProcedure
        .input(z.object({employeeName: z.string()}))
        .query(async ({ctx, input}) => {

            const result = await ctx.prisma.salary.findMany({
                orderBy : [
                    {
                        year: "desc"
                    }
                ],
                where : {
                    employeeName : input.employeeName,
                },
            })

            return result.filter((v,i,a)=>a.findIndex(v2=>(v2.salaryAmount===v.salaryAmount && v2.year === v.year))===i)
        }),

    getSalary: publicProcedure
        .input(z.object({
            searchQuery: z.string(), 
            ascending: z.string(), 
            yearQuery: z.string(),
            sortBy: z.string()
        }))
        .query(async ({ctx, input}) => {
            const ascendingString = input.ascending === "Ascending" ? "asc" : "desc"

            const results = await ctx.prisma.salary.findMany({
                where : {
                    year: input.yearQuery,
                    OR: [
                        {
                            employeeName: {
                                contains : input.searchQuery,
                                mode : 'insensitive'

                            }
                        },
                        {
                            division: {
                                contains : input.searchQuery,
                                mode : 'insensitive'

                            }
                        },
                        {
                            department: {
                                contains : input.searchQuery,
                                mode : 'insensitive'

                            }
                        }
                    ]
                },
                orderBy : [
                    input.sortBy === "Salary" ? 
                    {
                        salaryAmount : ascendingString
                    } 
                    :
                    input.sortBy === "Employee"
                    ?
                    {
                        employeeName : ascendingString
                    }
                    :
                    input.sortBy === "Title"
                    ?
                    {
                        title: ascendingString
                    }
                    :
                    input.sortBy === "Division"
                    ?
                    {
                        division: ascendingString,
                    }
                    :
                    {
                        department: ascendingString
                    }
                ]
            })

            return results

        }) 

})

export default salariesRouter