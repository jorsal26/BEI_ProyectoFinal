import { productModel } from '../models/products.model.js'

export default class ProductaService {
    constructor() { 
        console.log("Working products with Database persistence in mongodb");
    }

    getAll = async () => {
        let products = await productModel.find({});
        return products.map(product=>product.toObject());
    }
    save = async (product) => {
        let result = await productModel.create(product);
        return result;
    }
}
