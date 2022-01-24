const addProduct = () => {
    let productList = []
    let product = {
        product1: 'one',
        product2: 'tow',
        product3: 'three',
    }

    productList.push(product)
    return productList;
}


const getProduct = (productList) => {
    console.log(productList)
}

let product = addProduct();
getProduct(product);