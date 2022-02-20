const express =  require('express')
const signUp = require('../controller/signUpController')

const signUpRouter  =  express.Router()

signUpRouter.post('/', signUp)

module.exports = signUpRouter