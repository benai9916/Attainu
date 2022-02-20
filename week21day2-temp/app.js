const fs = require('fs')

function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
  
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
          if (currentline[j] !== undefined) {
            obj[headers[j].slice(1,-1)] = currentline[j].slice(1, -1)
          } else {
            obj[headers[j].slice(1,-1)] = currentline[j]
          }
        }
        result.push(obj);
    }

    fs.writeFile('cars.json', JSON.stringify(result), 'utf8', (err, result) => {
        if(!err)
        console.log('file saved')
    })
    
    return JSON.stringify(result);
  }


function arrayToCSV (data) {
    let jsonData = []
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));

    for(let i=0; i < csv.length; i++) {
      jsonData.push(csv[i].join(","))
    }

    let finalData = jsonData.join('\n').slice(1,-1)

    fs.writeFile('iris.csv', finalData, 'utf8', (err, result) => {
        if(!err)
        console.log('file saved')
    })
  }

  fs.readFile('iris.json', 'utf8', (err, result) => {
    arrayToCSV(JSON.parse(result))
  })

  // to JSON
  fs.readFile('cars.csv', 'utf8', (err, result) => {
    csvJSON(result)
  })