


const formatSalary = (unformattedSalary: number | string):string => {

    let salaryString = ""
    if (unformattedSalary.toString().includes(".")) {
        const numDigitsAfterDecimal = unformattedSalary.toString().split(".")[1]?.length
        if (numDigitsAfterDecimal == 2) {
            salaryString = unformattedSalary.toLocaleString("en-US")
        }
        else {
            salaryString = unformattedSalary.toLocaleString("en-US") + "0"
        }

    } 
    else {
        salaryString = unformattedSalary.toLocaleString("en-US") + ".00"
    }
    
    salaryString = "$" + salaryString

    return salaryString

}

export default formatSalary