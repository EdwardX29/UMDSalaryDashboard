import fs from "fs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]


for (let i = 0; i < years.length; i++) {

    let file = fs.readFileSync(`/Users/edwardxiao/Documents/code/t3/salarydashboard/scripts/jsonData/${years[i]}.json`)

    let data = JSON.parse(file)

    for (let j = 0; j < data.length; j++) {

        let dataElement = data[j]
        console.log(dataElement["Year"])
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
}

}



main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })