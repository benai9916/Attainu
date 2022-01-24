const express = require('express');
const path = require('path');

const PORT = 3000;
const app  = express();
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/about', (req, res) => {
    res.sendFile('about.html', {root: path.join(__dirname, 'public')});
});

app.get('/contact', (req, res) => {
    res.sendFile('contact.html', {root: path.join(__dirname, 'public')});
});


app.listen(PORT, ()=> {
    console.log(`we are liseting to port ${PORT}`);
})