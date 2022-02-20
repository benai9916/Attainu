const { rejects } = require('assert')
const express = require('express')
const fs = require('fs')

const PORT = 3000
const app = express()


app.get('/fileone', (req, res ) => {
    const getData = () => {
        return new Promise((resolve, reject) => {
            fs.readFile('fileone.txt', 'utf8', (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    getData().then((result) => {
        res.send(`<h2>${result}<h2>`)
    })
})

app.get('/filetwo', (req, res ) => {
    const getData = () => {
        return new Promise((resolve, reject) => {
            fs.readFile('filetwo.txt', 'utf8', (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    getData().then((result) => {
        res.send(`<h2>${result}<h2>`)
    })
})


app.listen(PORT, () => {
    console.log('server is listing to port ', PORT)
})