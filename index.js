// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employee) {
    return employee.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    const inEvent = {
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date,
        }
        employee.timeInEvents.push(inEvent)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    const inEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    }
        employee.timeOutEvents.push(inEvent)
    return employee
}

function hoursWorkedOnDate(employee, dateForm) {
    const timeIn = employee.timeInEvents.find(event => event.date === dateForm)   
    const timeOut = employee.timeOutEvents.find(event => event.date === dateForm)

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(empObj, date){
    //console.log("pay", empObj.payPerHour)
    return hoursWorkedOnDate(empObj, date) * empObj.payPerHour
}

function allWagesFor(employee) {
    const allWages = employee.timeInEvents.map(event => wagesEarnedOnDate(employee, event.date))
    return allWages.reduce((total, wage) => total + wage)
}

function calculatePayroll(employee) { 
    const totalForEachEmployee = employee.map(record => allWagesFor(record))
    return totalForEachEmployee.reduce((total, empTotal) => total + empTotal)
}