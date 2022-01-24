const getImage =  async () => {
    const image = await fetch('https://dog.ceo/api/breeds/image/random')
    .then((res) => {
        return res.json()
    })

    document.querySelector('.dog').src = image.message
}

// let a = [[1,2], [2,3], [3,4]]
// var mytable = "<table> <tr> <th>Name</th> <th>last</th></tr> <tr>";
// for (var c of a) {  
//     mytable += "<td>" + c[0] + "</td>"; 
//     // mytable += "<td>" + c[1] + "</td>";
// }
// mytable += "</tr></table>";
// document.getElementById("tab").innerHTML = mytable;

function createTable(tableData) {
    var table = document.querySelector('.table-class')
    var tableBody;
   
    tableData.forEach(function(rowData) {
    tableBody = document.createElement('div');
    tableBody.className = 'body'

    var cell;
      rowData.forEach(function(cellData) {
        cell = document.createElement('span');
        cell.innerHTML = cellData;
        tableBody.appendChild(cell);
      });
  
        table.appendChild(tableBody);
    });
    
    document.body.appendChild(table);
  }
  
//   createTable([["benai", "kumar"], ["john", "mathew"]]);

  function myFunction() {
    var filter, body, a, i, txtValue;
    filter = document.getElementById("myInput").value.toUpperCase();
    body = document.getElementsByClassName("body");
    for (i = 0; i < body.length; i++) {
        a = body[i].getElementsByTagName("span")[0];
        b = body[i].getElementsByTagName("span")[1]
        txtValue = a.textContent || a.innerText;
        txtValue2 = b.textContent || b.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
            body[i].style.display = "";
        } else {
            body[i].style.display = "none";
        }
    }
}

$.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        alldata = []
        res.map((items) => {
            alldata.push([
                items.name,
                items.username
            ])
        })
        console.log(alldata);
        createTable(alldata)
    }
});