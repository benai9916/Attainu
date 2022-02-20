const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// local import
const {userRoute} = require("./route/loginRoute")

const PORT = 3000
const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// engine
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

// databse connection
mongoose.connect("mongodb+srv://ben_attainu:attainu123@cluster0.uqqww.mongodb.net/user?retryWrites=true&w=majority", {
    useNewUrlParser: "true"
}).then((res) => {
    console.log('connnection success')
}).catch(err =>  console.log(err))


app.get('/login', (req, res) => {
    res.render('login')
})

app.use('/home',  userRoute)

app.listen(PORT, () => {
    console.log('server is listing to port : ', PORT)
})