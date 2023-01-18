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
        danielsManager = new ProductManager('database/inventory.txt')
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
        await expect(danielsManager.getProductById(1111)).rejects.toEqual(Error('No product with this ID found'))
    })
    test('resolves to returned expected product when id found', async () => {
        const returnedProduct = await danielsManager.
            getProductById(53904)
        expect(returnedProduct).toStrictEqual(testProduct)
    })
    test('will update key if the value is not id', async () => {
        await danielsManager.updateProduct(53904, 'title', 'updated titlte')
        const newUpdatedObject = await danielsManager.getProductById(53904)
        expect(newUpdatedObject.title).toBe('updated titlte')
    })
    test('will throw error when trying to update id', async () => {
        await expect(danielsManager.updateProduct(53904, 'id', 32)).rejects.toEqual(Error('You should not try to update the ID'))
    })
    test('will throw if id of deleting item is invalid', async () => {
        await expect(danielsManager.deleteProduct(12)).rejects.toEqual(Error('No product with this ID found'))
    })
    test('will delete product if id is valid', async () => {
        await danielsManager.deleteProduct(53904);
        await expect(danielsManager.getProducts()).resolves.toStrictEqual([])
    })
})
