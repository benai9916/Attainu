const fs = require('fs')


const csvToJson = (csv) => {
    let lines = csv.split("\n")
    let result = []

    let header = lines[0].split(",")
    for(let i=1; i< lines.length; i++) {
        let obj= {}
        let currentline = lines[i].split(",")

        for(let j=0; j< header.length; j++) {
            if(currentline[j] !== undefined) {
                obj[header[j].slice(1,-1)] = currentline[j].slice(1, -1)
            } else {
                obj[header[j].slice(1,-1)] = currentline[j]
            }
        }

        result.push(obj)
    }

    fs.writeFile("cars.json", JSON.stringify(result), 'utf8', (err, result) => {
        if(!err){
            console.log("data saved")
        }
    })
}

const jsonToCsv = (data) => {
    let jsonData = []

    csv = data.map(row => Object.values(row))
    csv.unshift(Object.keys(data[0]))

    for(let i=0; i< csv.length; i++) {
        jsonData.push(csv[i].join(","))
    }

    let finalData = jsonData.join("\n").slice(1, -1)

    fs.writeFile("iris.csv", finalData, 'utf8', (err, result) => {
        if(!err){
            console.log("data saved")
        }
    })
}

fs.readFile('cars.csv', 'utf8', (err, data) => {
    csvToJson(data)
})

fs.readFile('iris.json', 'utf8', (err, data) => {
    jsonToCsv(JSON.parse(data))
})