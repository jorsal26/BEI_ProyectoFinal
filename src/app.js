import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from "./routes/views.router.js";
import mongoose from 'mongoose'
import { productModel } from './models/products.model.js'

const app = express();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


// Ruta para la vista home
// app.get('/', async (req, res) => {
//     try {
//         const products = await productModel.find()

//         res.render('index', { products, title: 'Lista de Productos' });
//     } catch (error) {
//         console.error("No se pudo obtener productos con moongose: " + error);
//         res.status(500).send({ error: "No se pudo obtener productos con moongose", message: error });
//     }
// });

// Router
app.use('/',viewsRouter);
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});


//Coneccion a la base de datos
const uriDB='mongodb+srv://salinasjorgeluis26:YfPLse2acK8ZLIgb@pasteleria.ybu41.mongodb.net/Pasteleria?retryWrites=true&w=majority&appName=Pasteleria'

const connectMongoDB = async () => {
    try {
        await mongoose.connect(uriDB);
        console.log('Base de datos conectada');

        // Sin filtros
        console.log("==>Sin filtro<==");
        let response1 = await productModel.find().explain('executionStats')
        // console.log(response1);


        // usando paginacion
        let response2 = await productModel.paginate({ category: "Pasteleria" }, { limit: 5, page: 4 });

    } catch (error) {
        console.log(error);
    }
}

connectMongoDB();
