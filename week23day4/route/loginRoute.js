const express = require('express')
const {userLogin} = require('../controller/loginController')

const userRoute = express.Router();

userRoute.post('/', userLogin)

module.exports = {
    userRoute
}