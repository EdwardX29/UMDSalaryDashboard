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
                            contains: input.nameQuery
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
                    employeeName : input.employeeName
                },
            })

            return result.filter((v,i,a)=>a.findIndex(v2=>(v2.salaryAmount===v.salaryAmount && v2.year === v.year))===i)
        })


})

export default salariesRouter