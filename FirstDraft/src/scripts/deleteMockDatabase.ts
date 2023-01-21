import { ProductManager } from "../api/managers/ProductManager";

let setUpManager = new ProductManager('database/products.txt')
setUpManager.deleteAllProducts();