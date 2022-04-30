const mongoose = require('mongoose')

const employee = new mongoose.Schema({
    name: String,
    empId: String,
    salary: Number
})

module.exports = mongoose.model('employee', employee)