const employee = require('../model/employee')

const addEmployee = async (req, res) => {
    let data = req.body

    let employeeData = new employee(data)
    try {
        await employeeData.save()
    } catch {
        return res.send({err: 'something went wring'})
    }
    
    res.send('data saved')
}

const getEmployee = async (req, res) => {
    let data = req.body

    let empData = await employee.find()

    if (!empData) {
        res.send({err: 'something went wring'})
    }

    res.send(empData)
}


const upadteEmployee = async (req, res) => {
    let data = req.body
    console.log(data)
    try {
        await employeeData.findByIdAndUpdate({_id: req._id}, data, {new: true})
    } catch(err) {
        return res.send({err: err})
    }

    res.send(empData)
}

module.exports = {
    addEmployee,
    getEmployee,
    upadteEmployee
}