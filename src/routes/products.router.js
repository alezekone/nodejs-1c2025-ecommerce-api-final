// import express from 'express';
// const router = express.Router();

// Es mejor importar solo esta partecita de
// quilmes.2
// Express y no todo el módulo.
import {Router} from 'express';
const router = Router();

import {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    replaceProduct,
    deleteProduct,
    getFilteredProducts
} from '../controllers/products.controller.js';

import {auth} from '../middlewares/auth.middleware.js';
// import { createProduct, /*updateProduct*/ } from '../models/products.model.js';

// router.get('/products', (req, res) => {
    // res.send('Lista de productos');
    // res.status(200).json({
    //     message: 'Lista de productos',
    //     products: [] // Aquí iría el array de productos
    // });
// });

// router.get('/products', auth, getAllProducts);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/product', auth, createNewProduct);
router.patch('/product/:id', auth, updateProduct);
router.put('/product/:id', auth, replaceProduct);
router.delete('/product/:id', auth, deleteProduct);

router.get('/product/:id', (req,res) => {
    const id = req.params.id;
    res.send(`Este es un GET del producto con id ${id}`);
});

router.get('/products/filtered', getFilteredProducts);


// router.post('/products/create', (req, res) => {
//     res.send('Crearé un producto a partir del json recibido en el body');
//});

router.delete('/products/:id',  (req,res) => {
    res.send(`Este es un DELETE del producto con id ${id}`);
});

export default router;

