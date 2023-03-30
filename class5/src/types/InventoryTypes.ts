
export type Product = {
    title: string,
    description: string,
    price: number,
    thumbnails?: string[],
    code: string,
    stock: number
    id?: number | null
}

export type SubCartProduct = {
    id: number,
    quantity: number,
}

export type Cart = {
    id?: number,
    products: SubCartProduct[]
}