const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const empRouter = require('./router/employeeRouter')

const PORT = 3000
const app = express()

app.use(bodyParser.json())


mongoose.connect("mongodb+srv://ben_attainu:attainu123@cluster0.fm6nt.mongodb.net/employee?retryWrites=true&w=majority", {
    useNewUrlParser: "true"
}).then((res) => {
    console.log("database connected")
}).catch(err => {
    console.log("error connecting to databse")
})


app.use('/', empRouter)


app.listen(PORT, () => {
    console.log("server is listing to port : ", PORT)
})
