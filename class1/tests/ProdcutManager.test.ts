import { Product, ProductManager } from "../src/ProductManager";


describe('testing  product manager', () => {
    let danielsProductManager: ProductManager
    let testProduct: Product = {
        "title": "producto prueba",
        "description": "Este es un producto prueba",
        "price": 200,
        "thumbnail": "Sin imagen",
        "code": "abc123",
        "stock": 25
    }
    test('Create new product manager, expect it to be empty', async () => {
        danielsProductManager = new ProductManager('Daniel');
        let products = await danielsProductManager.getProducts();
        console.log(products)
        expect(products.length).toBe(0)
    })
    test('Add a new product', async () => {
        let addedSuccesfully = await danielsProductManager.addProduct(testProduct)
        expect(addedSuccesfully).toBe(true)
        let products = await danielsProductManager.getProducts();
        expect(products.length).toBe(1);
        expect(products[0].id).toBeGreaterThan(0)
    })
    test('add product with same values again', async () => {
    })
    test('trhow error if value not found', async () => {
        let returnedProduct = await danielsProductManager.getProductById(1111);
        expect(returnedProduct).toBe(undefined);
    })
    test('finds the right value', async () => {
        let returnedProduct = await danielsProductManager.getProductById(53904);
        expect(returnedProduct).toBe(testProduct);
    })
})
