const displayUserData = (userData) => {
    let searchWrapper =  document.querySelector('.search-wrapper');
    let searchBody;

    userData.forEach(rowData => {
        searchBody =  document.createElement('div')
        searchBody.className = "search-body"

        let row;
        rowData.forEach((colData) => {
            row =  document.createElement('span')
            row.innerHTML = colData
            searchBody.appendChild(row)
        });

        searchWrapper.appendChild(searchBody)
    });

    document.body.appendChild(searchWrapper)
}


const searchFilter = () => {
    let filter, body, textOne, textTwo, textValueOne, textValueTwo;
    filter = document.getElementById('search-text').value.toLowerCase();
    body = document.getElementsByClassName('search-body');
    for(let i=0; i< body.length; i++) {
        textOne= body[i].getElementsByTagName('span')[0]
        textTwo= body[i].getElementsByTagName('span')[1]

        textValueOne = textOne.textContent || textOne.innerText
        textValueTwo = textTwo.textContent || textTwo.innerText

        if(textValueOne.toLowerCase().indexOf(filter) > -1  || textValueTwo.toLowerCase().indexOf(filter) > -1) {
            body[i].style.display = ""
        } else {
            body[i].style.display = "none"
        }
    }
}

$.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    type: "GET",
    dataType: "json",
    success: function(res) {
        userData = []
        res.map((item) => {
            userData.push([item.name, item.username])
        })

        displayUserData(userData)
    }
})