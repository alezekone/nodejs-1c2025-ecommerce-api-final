import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import productsRouter from './src/routes/products.router.js';
import authRouter from './src/routes/auth.router.js';


const app = express();

// ############ Manejo de CORS - INICIO ############
// Configuración manual para el manejo de CORS:
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

// Usaré la librería CORS para las request cross-origin.
// Permitiré todas las solicitudes de origen cruzado, pues
// será una API pública.
app.use(cors());  
// Para configurar CORS de manera más específica, ver:
// https://github.com/expressjs/cors/blob/master/README.md
// Y para entenderlo mejor, ver:
// https://aws.amazon.com/es/what-is/cross-origin-resource-sharing/
// Tener presente que esto aplica cuando se accede desde un navegadror web,
// ya que es el navegador el que bloquea las solicitudes cross-origin.
// Si accedemos desde Postman o desde un cliente HTTP (como el de una app móvil),
// no habrá problemas de CORS.
// ############ Manejo de CORS - FIN ############

// Uso un middleware para ver el request recibido.
app.use((req, res, next) => {
    console.log(`Request recibido: ${req.method} ${req.headers.host} ${req.url}`);
    next();
});

// Uso este middleware para poder recibir/parsear JSON
// en el body de las requests. También se puede usar body-parser,
// pero desde Express 4.16.0 ya viene incluido en Express.
// Me permite obtener el body de la request y transformarlo en 
// un objeto JSON que es req.body.
app.use(express.json()); 

app.get('/', (req, res) => {
    // res.status(200).send('Hola mundo desde Express !');
    res.json({message: 'Hola mundo desde Express !!!', status: 'success'});
});

app.use('/api/auth', authRouter);

app.get('/api', (req, res) => {
    res.json({
        message: 'API funcionando correctamente',
        status: 'success'
    });
});

// Usamos el router de productos. Le ponemos el prefijo '/api', así que 
// la ruta debe tener la forma http://localhost:3000/api/products.
app.use('/api', productsRouter);
app.use('/auth', authRouter);

// Usando Path Params (Rutas parametrizadas).
app.get('/item/:id', (req, res) => {
    const itemId = req.params.id;
    res.send(`Detalles del item con id: ${itemId}`);
});

// Usando Query Params (Rutas con parámetros de consulta).
// Ejemplo: /items?category=electronics&price=low
app.get('/items', (req, res) => {
    // const { category, price } = req.query;  // <= Increíble !!!
    const category = req.query.category;
    const price = req.query.price;
    res.send(`Items filtrados por categoría: ${category} y precio: ${price}`);
});

// Agrego un middleware para capturar las rutas no encontradas, devolviendo un error 404.
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, 
    () => {console.log(`Servidor funcionando en http://localhost:${PORT}`);}
);
