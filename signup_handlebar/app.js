const express = require('express');
const exphbs = require('express-handlebars');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'));

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/uploads'));
    },
    filename: (req, file, cb) => {
        fileExtension = file.mimetype.split('/')[1]
        cb(null, file.fieldname+'.'+fileExtension)
    }
})

let upload = multer({storage: storage});


app.get('/signup', (req, res) => {
    res.render('signup');
})

app.post('/profile', upload.single('avtar'), (req, res) => {
    console.log(req.file)

    let data = {
        name: req.body.name,
        email: req.body.email,
        filename: `${req.file.fieldname}.jpeg`
    }

    res.render('profile', data);
})


app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
})