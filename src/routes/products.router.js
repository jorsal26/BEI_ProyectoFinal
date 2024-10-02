import { Router } from 'express'
import { productModel } from '../models/products.model.js'
import ProductService from '../service/products.service.js';

const router = Router();
const productService = new ProductService();

// APIs
// GET
router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll();

        res.send(products)
    } catch (error) {
        console.error("No se pudo obtener productos con moongose: " + error);
        res.status(500).send({ error: "No se pudo obtener productos con moongose", message: error });
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const products = await productModel.find({_id: req.params.pid})

        res.send({ result: "success", payload: products })
    } catch (error) {
        console.error("No se pudo encontrar el producto con moongose: " + error);
        res.status(500).send({ error: "No se pudo encontrar el producto con moongose", message: error });
    }
})

router.post('/',async(req,res)=>{
    try {
        let result = await productService.save(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error("No se pudo crear productos con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear productos con moongose", message: error });
    }
})

// POST
// router.post('/', async (req, res) => {
//     try {
//         const { title, description, code, price, stock, category, thumbnails } = req.body;

//         if (!title || !description || !code || !price || !stock || !category) {
//             return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
//         }

//         const newProduct = await productModel.create({ title, description, code, price, stock, category, thumbnails })

//         res.status(201).send(newProduct)
//     } catch (error) {
//         console.error("No se pudo crear productos con moongose: " + error);
//         res.status(500).send({ error: "No se pudo crear productos con moongose", message: error });
//     }
// })


// PUT
router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updateProduct = await productModel.updateOne({_id: req.params.pid}, req.body);

        res.status(202).send(updateProduct);
    } catch (error) {
        console.error("No se pudo actualizar producto con moongose: " + error);
        res.status(500).send({ error: "No se pudo actualizar producto con moongose", message: error });
    }
})

// DELETE
router.delete('/:pid', async (req, res) => {
    try {
        const deletedProduct = await productModel.deleteOne({_id: req.params.pid})

        res.status(202).send({ result: "success", payload: deletedProduct });
    } catch (error) {
        console.error("No se pudo eliminar producto con moongose: " + error);
        res.status(500).send({ error: "No se pudo eliminar producto con moongose", message: error });
    }
})

export default router;