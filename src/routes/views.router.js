import {Router} from 'express';
import ProductService from '../service/products.service.js';
import { productModel } from '../models/products.model.js'
// import CourseService from '../services/db/courses.service.js';

const productService = new ProductService();
// const courseService = new CourseService();

const router = Router();

// router.get('/', (req, res) => {
//     res.render('index', {})
// })

router.get('/',async(req,res)=>{
    // let products = await productService.getAll();
    console.log(products);
    // res.render('products',{products: products})

    let page = parseInt(req.query.page);
    if (!page) page = 1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await productModel.paginate({}, { page, limit: 5, lean: true })
    result.prevLink = result.hasPrevPage ? `http://localhost:9090/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:9090/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result)
})

// router.get('/courses',async(req,res)=>{
//     let courses = await courseService.getAll();
//     console.log(courses);
//     res.render('courses',{courses})
// })


export default router;