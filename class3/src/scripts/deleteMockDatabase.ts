import { ProductManager } from "../managers/ProductManager";

let setUpManager = new ProductManager('database/inventory.txt')
setUpManager.deleteAllProducts();