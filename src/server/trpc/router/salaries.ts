import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const salariesRouter = router({

    searchStaffMember: publicProcedure
        .input(z.object({nameQuery: z.string()}))
        .query(async ({ctx, input}) => {
            if (input.nameQuery !== "")
                return await ctx.prisma.employee.findMany({
                    orderBy : [
                        {
                            name: "asc"
                        }
                    ],
                    where : {
                        name: {
                            contains: input.nameQuery
                        }
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
        }),


    getStaffMembersSalaries : publicProcedure
        .input(z.object({employeeName: z.string()}))
        .query(async ({ctx, input}) => {

            return await ctx.prisma.salary.findMany({
                orderBy : [
                    {
                        year: "desc"
                    }
                ],
                where : {
                    employeeName : input.employeeName
                }
            })

        })


})

export default salariesRouter