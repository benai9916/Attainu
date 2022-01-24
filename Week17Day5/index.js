class Person {
    // #name;
    constructor(name, age) {
        this.name = "dfd---" +name
        this.age = age
    }
}

class Employee extends Person {
    constructor(empId) {
        super()
        this.empId = empId
    }

    get getEmpId () {
        return this.empId;
    }
}

class Admin extends Person {
    constructor(role){
        super()
        this.role = role
    }

    set setName(name) {
        this.name = name
    }

    get getName() {
        return `${this.name} ${this.age}`
    }
}

// admin = new Admin("admin")
// admin.setName = 'john'
// admin.age = 20
// emp = new Employee("ben10")
// emp.name = "dndd"
// console.log(admin.getName)
// console.log(emp)


// const addProduct = (obj) => {
//     product = []
//     product.push(obj)
//     return product
// }

// const getPr = (addProduct) => {
//     console.log(addProduct)
// }

// let ob = {
//     a: 'dff',
//     b: 'djdjbd',
//     c: 'dff'
// }
// let c = addProduct(ob)
// getPr(c)


// let addP =  new Promise((resolve, reject) => {
    
//     resolve([{
//         a: 'dff',
//         b: 'djdjbd',
//         c: 'dff'
//     }])
//     reject('something went wrong')
// })

// addP.then((res) => {
//     console.log("====",res)
// }).catch((err) => {
//     console.log(err)
// })

// const openn = async () => {
//     let awair c =  await [{
//                 a: 'dff',
//                 b: 'djdjbd',
//                 c: 'dff'
//             }]
//     return c
// }

// openn().then((res) => {
//     console.log(res)
// })
// import fetch from 'cross-fetch';


const ok  = async () => {
 let c = await fetch('https://dog.ceo/api/breeds/image/random')
    .then((res) =>  {
        return res.json()
    })
    // console.log
   document.querySelector('.ok').src = c.message
    
}