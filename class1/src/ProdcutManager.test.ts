import { Product, ProductManager } from './ProductManager'


describe('testing  product manager', () => {
    let danielsManager: ProductManager
    const testProduct: Product = {
        'title': 'producto prueba',
        'description': 'Este es un producto prueba',
        'price': 200,
        'thumbnail': 'Sin imagen',
        'code': 'abc123',
        'stock': 25
    }
    test('Products of new product manager are empty', async () => {
        danielsManager = new ProductManager('Daniel')
        const products = await danielsManager.getProducts()
        expect(products.length).toBe(0)
    })
    test('Adding new prodcut is succesfull', async () => {
        await danielsManager.addProduct(testProduct)
        const products = await danielsManager.getProducts()
        expect(products.length).toBe(1)
        expect(products[0].id).not.toBeNull
    })
    test('throw error when same product is added', async () => {
        await expect(danielsManager.addProduct(testProduct)).rejects.toEqual(Error('Duplicate product found'
        ))
    })
    test('throw error if id value not found', async () => {
        await expect(danielsManager.getProductById(1111)).rejects.toEqual(Error('No product with this ID found'
        ))
    })
    test('resolves to returned expected product when id found', async () => {
        const returnedProduct = await danielsManager.
            getProductById(53904)
        expect(returnedProduct).toBe(testProduct)
    })
})
