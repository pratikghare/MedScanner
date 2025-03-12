import products from "../../samples/products.json";

export const productResolver = {
    Query: {
        getProductById: (_: any, { productId } : { productId: number }) => products.find((product) => product.productId == productId),
        getAllProducts: () => products,
        getProductsByName: (_: any, { name } : { name: string }) => products.filter((product) => String(product.name).toLocaleLowerCase().includes(String(name).toLocaleLowerCase())),

    },
};