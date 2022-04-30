const express = require('express');
const {addEmployee, getEmployee, upadteEmployee, deleteEmployee} = require('../controller/empController');

const empRouter = express.Router();

empRouter.post('/employee', addEmployee)
empRouter.get('/employee', getEmployee)
empRouter.put('/employee', upadteEmployee)
empRouter.delete('/employee')

module.exports = empRouter