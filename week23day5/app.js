const express = require('express');
const bodyParser = require('body-parser')
const expHbs = require('express-handlebars')
const mongoose = require('mongoose')

// local import
const signUpRouter = require('./router/signUpRouter')

const PORT = 3000
const app = express()

// engine
app.engine('hbs', expHbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// database
mongoose.connect("mongodb+srv://ben_attainu:attainu123@cluster0.9hki4.mongodb.net/register?retryWrites=true&w=majority", {
    useNewUrlParser: "true"
}).then(res => console.log('connection success !!'))
.catch(err => console.log(err))


// router
app.get('/signup', (req, res) => {
    console.log("====", req.body)
    // res.render('signup')
})

app.use('/home', signUpRouter)

app.listen(PORT, ()=> {
    console.log('server is listening to port ', PORT)
})