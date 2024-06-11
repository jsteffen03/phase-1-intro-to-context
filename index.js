// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1] ,
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr){
    return arr.map(arr => {
        return {
        firstName: arr[0],
        familyName: arr[1] ,
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
        }
    })
}

function createTimeInEvent(employee, date_hour){
    const [date, hour] = date_hour.split(' ')

    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    }
    employee.timeInEvents.push(timeInEvent);

    return employee
}

function createTimeOutEvent(employee, date_hour){
    const [date, hour] = date_hour.split(' ')

    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    }
    employee.timeOutEvents.push(timeOutEvent);

    return employee
}
function hoursWorkedOnDate(employee, date){
    const timeInEvent = employee.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date)

    const timeInHour = timeInEvent.hour
    const timeOutHour = timeOutEvent.hour 

    const hoursWorked = (timeOutHour - timeInHour) / 100

    return hoursWorked

}

function wagesEarnedOnDate(employee, date){
    const timeInEvent = employee.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date)

    const timeInHour = timeInEvent.hour
    const timeOutHour = timeOutEvent.hour 

    const hours = (timeOutHour - timeInHour) / 100

    const payRate = employee.payPerHour

    let payed = parseInt(hours * payRate)

    return payed
}

function allWagesFor(employee){
    let hours = 0
    employee.timeInEvents.forEach((timeInEvent) =>{
       employee.timeOutEvents.forEach(timeOutEvent => {
        if(timeOutEvent.date == timeInEvent.date){
           hours += wagesEarnedOnDate(employee, timeInEvent.date)
        }
       })
    })
    return hours
}

function calculatePayroll(employees){
    let total = 0
    employees.forEach(employee => {
        total += allWagesFor(employee)
    }) 
    return total
}