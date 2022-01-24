const express = require('express');
const multer =  require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = 3000;

const app = express();
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('profile'));


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'profile'))
    },
    filename: (req, file, cb ) => {
        cb(null, file.originalname)
    }
});

let upload = multer({storage: storage})


const authenticate = (req, res, next) => {
    let email =  req.query.email
    let password = req.query.password
    if(fs.existsSync('data.json')) {
        fs.readFile('data.json', 'utf8', (err, data) => {
            let json =  JSON.parse(data)

            json.data.map((item) => {
                if(item.email ===  email  && item.password === password) {
                    req.body = item;
                    return next();
                }
            })
        })
    }
}


app.get('/signUp', (req, res) => {
    res.render('signup')
})

app.post('/profile', upload.single('profile') ,(req, res) => {
    let finalData = { data: [] }
    finalData.data.push({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            profile: req.file.originalname
    })

    if(fs.existsSync('data.json')) {
        fs.readFile('data.json', 'utf8', (err, data) => {
            let json = JSON.parse(data)
            json.data.push(finalData.data[0])

            fs.writeFile('data.json', JSON.stringify(json) ,'utf8', (err, result) =>{
                if(!err) {
                    console.log('Data saved')
                    res.render('profile', finalData.data[0])
                }
            })
        })
    } else {
        fs.writeFile('data.json', JSON.stringify(finalData) ,'utf8', (err, result) =>{
            if(!err) {
                console.log('Data saved')
                res.render('profile', finalData.data[0])
            }
        })
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})


app.get('/profile', authenticate, (req, res) => {
    console.log(req.body)
    res.render('profile', req.body)
})


app.listen(PORT, () => {
    console.log(`we are listining to port ${PORT}`)
})