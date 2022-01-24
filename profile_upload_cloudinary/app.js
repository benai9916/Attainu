const express = require('express');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const exphbs = require('express-handlebars');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PORT = 3000;

const app = express();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// save image
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/uploads'))
    },
    filename: (req, file, cb) => {
        fileExtension = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '.' + fileExtension)
    }
})

let upload = multer({ storage: storage});


app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))

app.set('view engine', 'hbs');

app.get('/upload', (req, res) => {
    res.render('upload');
})

app.post('/display', upload.single('profile'), (req, res) => {

    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if(err) {
            console.log("erro", err)
        }
        
        fs.unlinkSync(req.file.path);

        res.render('display', {
            imageUrl: result.secure_url
        })
    })
})

app.listen(PORT, ()=> {
    console.log(`server running at :${PORT}`);
});