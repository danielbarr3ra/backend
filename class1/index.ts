class ProductManager {
    name: string
    products: Product[]
    constructor(
        name: string
    ) {
        this.name = name
        this.products = []
    }


}

type Product = {
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    code: number,
    stock: string
}