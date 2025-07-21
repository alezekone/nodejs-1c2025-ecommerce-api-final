// Un Controller
// 1.- Recibe la HTTP request del cliente desde una ruta.
// 2.- Procesa la request, interactuando con el modelo
// (a veces -si tiene sentido- lo hace a través de un servicio).
// Tiene sentido cuando hay lógica de negocio que aplicar, por ejemplo,
// validar datos, transformarlos, hacer un filtro, etc.
// 3.- Crea y devuelve una HTTP response al cliente.

// Tengo la intención de pasar solo algunas funciones a través
// de la capa de Servicios. Solo aquellas en las cuales haya
// alguna forma de transformación de datos o de validación.
import * as Service from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Supongamos que Product es nuestro modelo
        res.status(200).json({
            message: 'Lista de productos',
            products: ["producto1", "producto2", "producto3"] // Aquí iría el array de productos
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await products.findById(product => product.id === id);
        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            message: 'Detalles del producto',
            product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el producto',
            error: error.message
        });
    }
};

// Esta es la que voy a traer -luego- desde la capa de servicios.
export const getFilteredProducts = (req, res) => {
    const filteredProducts = Service.getFilteredProducts();
    res.status(200).json({
        message: 'Lista de productos filtrados',
        products: filteredProducts
    });
};
