import { Router } from 'express'
import CartManager from '../service/CartManager.js'
import ProductManager from '../service/ProductManager.js'
import { cartModel } from '../models/carts.model.js'
import { productModel } from '../models/products.model.js'

const router = Router();
// const cartManager = new CartManager();
// const productManager = new ProductManager();

// APIs
// GET
router.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find()

        res.send({ result: "success", payload: carts })
    } catch (error) {
        console.error("No se pudo obtener carritos con moongose: " + error);
        res.status(500).send({ error: "No se pudo obtener carritos con moongose", message: error });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const carts = await cartModel.find({_id: req.params.cid})

        res.send({ result: "success", payload: carts })
    } catch (error) {
        console.error("No se pudo encontrar el carrito con moongose: " + error);
        res.status(500).send({ error: "No se pudo encontrar el carrito con moongose", message: error });
    }
})

// POST
router.post('/', async (req, res) => {
    try {
        const { cart } = req.body;

        if (!cart) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const newCart = await cartManager.addCart({ cart })

        res.status(201).json(newCart)
    } catch (error) {
        console.log(error);
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const cart = await cartManager.getCartById(cartId);
        console.log(cart);

        if (!cart) {
            return res.status(400).json({ error: 'Carrito no encontrado.' });
        }

        const product = await productManager.getProductById(productId)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        const newProductCart = await cartManager.addProductToCartByCid(cartId, productId)

        res.status(201).json(newProductCart)
    } catch (error) {
        console.log(error);
    }
})

// DELETE
router.delete('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const deletedCart = await cartManager.deleteCart(cartId)
        if (deletedCart) {
            res.json(deletedCart)
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
})


export default router;