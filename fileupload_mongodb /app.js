const express = require('express');
const mongoose = require('mongoose');
const expshbs =  require('express-handlebars');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileModel = require('./model/fileModel');

const PORT = 3000;
const app = express();
app.engine('hbs', expshbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))


let storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'upload'));
    },
    filename: (req, file, cb) => {
        let extension = file.mimetype.split('/')[1]
        cb(null, `file.fieldname + ${new Date().toUTCString()}.${extension}`)
    }
})

let upload = multer({storage: storage})

app.set('view engine',  'hbs')

app.get('/upload', (req, res) => {
    res.render('upload')
})

app.post('/gallery', upload.single('picture') ,(req, res) => {
    console.log(req.file);

    let img = fs.readFileSync(req.file.path);
    let encodeImg = img.toString('base64');

    let finalImage = {
        image: {
            contentType: req.file.mimetype,
            data: new Buffer(encodeImg, 'base64')
        }
    }

    fileModel.create(finalImage, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Image saved to database');
        }
    })

    fileModel.find({}, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            let allImage = []

            result.map((items) => {
                let encode = Buffer.from(items.image.data).toString('base64');
                allImage.push({imgData: encode})
            })

            res.render('gallery', allImage)
        }
    })
});


mongoose.connect('mongodb+srv://ben_attainu:dZo5QUYNqo9oGUsx@cluster0.ejvzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => {
    console.log(`we are listing to port ${PORT}`)
}))
.catch((err) => {
    console.log(err)
});


