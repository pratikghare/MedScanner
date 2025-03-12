const products = require("./products.json");


console.log(products.filter(product => !product.price))