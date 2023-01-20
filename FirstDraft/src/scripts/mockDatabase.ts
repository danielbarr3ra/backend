import { ProductManager, Product } from '../managers/ProductManager'
let mockedProducts: Product[] = [{
    'title': 'testProduct1',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'abc123',
    'stock': 25
}, {
    'title': 'testProduct2',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'cda132',
    'stock': 25
}, {
    'title': 'testProduct3',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': '123ida',
    'stock': 25
}, {
    'title': 'testProduct4',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'adf312',
    'stock': 25
}, {
    'title': 'testProduct5',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'aaabb1',
    'stock': 25
}, {
    'title': 'testProduct6',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'abc1231',
    'stock': 25
}, {
    'title': 'testProduct7',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'cda1322',
    'stock': 25
}, {
    'title': 'testProduct8',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': '123ida3',
    'stock': 25
}, {
    'title': 'testProduct9',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'adf3124',
    'stock': 25
}, {
    'title': 'testProduct10',
    'description': 'testProduct',
    'price': 200,
    'thumbnail': 'testimage',
    'code': 'aaabb15',
    'stock': 25
},]

let setUpManager = new ProductManager('database/inventory.txt')

const setDBup = async () => {
    for (const prod of mockedProducts) {
        await setUpManager.addProduct(prod)
    }
}

setDBup()