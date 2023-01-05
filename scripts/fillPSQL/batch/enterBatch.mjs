import fs from "fs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

let file = fs.readFileSync(`/Users/edwardxiao/Documents/code/t3/salarydashboard/scripts/fillPSQL/batch/2022_b3.json`)

let data = JSON.parse(file)

for (let i = 0; i < data.length; i++) {
    const dataElement = data[i]

    if (i % 10 == 0) console.log(i)

    await prisma.salary.create({
        data: {
            department : dataElement["Department"],
            division: dataElement["Division"],
            title: dataElement["Title"], 
            salaryAmount: parseFloat(dataElement["Salary"].replace(/,/g, '')),
            year: dataElement["Year"],

            employee: {
                connectOrCreate :{
                    where: {
                        name: dataElement["Employee"]
                    },

                    create: {
                        name: dataElement["Employee"]
                    }
                }
            },
        },
    })
}

console.log("completed")