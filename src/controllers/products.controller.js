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
// Para lo que no requiera lógica de negocio, llamaré al modelo
// directamente desde el Controller.
import * as Model from '../models/products.model.js'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Model.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find(); // Supongamos que Product es nuestro modelo
//         res.status(200).json({
//             message: 'Lista de productos',
//             products: ["producto1", "producto2", "producto3"] // Aquí iría el array de productos
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error al obtener los productos',
//             error: error.message
//         });
//     }
// };

export const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Model.getProductById(id);
        if(!product) {
            res.status(404).json({
                message: "Producto inexistente en la BD."
            });
        } else {
            res.status(200).json({
                message: "Detalles del producto",
                product
            });
        }
    } catch {
        res.status(500).json(
            {
                message: "Error al interactuar con la Firestore."
            }
        )
    }
}

export const createNewProduct = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category; /*Espero un array*/
    if (Array.isArray(req.body.category)) 
        console.log(`Category is an array ${req.body.category}`);
    else
        console.log(`Category is not an array ${req.body.category}`); 
    try {
        const newProduct = await Model.createProduct(req.body);
        res.status(201).json({
            message: 'Producto creado exitosamente',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message
        });
    }
}

// Esto es para un PATCH, que actualiza parcialmente un producto.
export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name; // Ojo, si no viene, será undefined !!!
    const price = req.body.price; // Ojo, si no viene, será undefined !!!
    const category = req.body.category; /*Espero un array*/ // Ojo, si no viene, será undefined !!!
    console.log("Data to update with: ", req.body);
    if (Array.isArray(req.body.category)) 
        console.log(`Category is an array ${req.body.category}`);
    else
        console.log(`Category is not an array ${req.body.category}`); 
    try {
        // const updatedProduct = await Model.updateProduct(id, { name, price, category });
        const updatedProduct = await Model.updateProduct(id, req.body);
        // console.log('Producto actualizado: ', updatedProduct);
        // console.log('Producto actualizado: ', {
        //     message: 'Producto actualizado exitosamente',
        //     estado: updatedProduct.estado,
        //     product: updatedProduct.recurso
        // });
        // Aclaración superimportante: el código de estado 201 indica que 
        // se CREÓ un recurso (en este caso, al hacer el PATCH, el recurso
        // que se quería modificar no existía, entonces lo creó). El objeto
        // creado -posiblemente con información adicional- puede ser devuelto
        // en el body del response.
        // Si el objeto existía previamente, debemos devolver un código de
        // estado 204 (No content), caso en el cual la especificación HTTP/1.1
        // indica que "la request no debe incluir un body". Por esta razón,
        // aunque intentemos crear un body (por ejemplo con obleto modificado),
        // Express.js no lo permitirá (lo ignora). Si quisieramos devolver 
        // contenido habrá que usar otro código que lo permita (como 202 Accept),
        // pero esto no es lo usual para una actualización de recurso (PUT o PATCH).
        if (updatedProduct.estado === 204) {
            return res.status(204).send(); // No content
        }
        if (updatedProduct.estado === 400) {
            res.status(updatedProduct.estado).json({
            message: 'Producto no encontrado',
            });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error.message);
        if(error.message === 'Producto no encontrado') {
            res.status(404).json({
                message: 'Producto no encontrado'
            });
        }
        res.status(500).json({
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
}

// Esto es para un PUT, que "pisa" un producto.
export const replaceProduct = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category; /*Espero un array*/
    // if (Array.isArray(req.body.category)) 
    //     console.log(`Category is an array ${req.body.category}`);
    // else
    //     console.log(`Category is not an array ${req.body.category}`); 
    try {
        const updatedProduct = await Model.replaceProduct(id, req.body);
        // El status code 201 indica que, al hacer el PUT, se creó un nuevo recurso.
        // El status code 204 indica que se actualizó un recurso existente.
        if (updatedProduct.estado === 204) {
            return res.status(204).send(); // No content
        }
        if (updatedProduct.estado === 201) {
            res.status(201).json({
                message: 'Producto actualizado (creado) exitosamente',
                estado: updatedProduct.estado,
                product: updatedProduct.recurso
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const borrado = await Model.deleteProduct(id);
        if(!borrado) {
            res.status(404).json({
                message: "No se eliminó nada."
            });
        } else {
            res.status(200).json({
                message: "Producto eliminado exitosamente."
            });
        }
    } catch {
        res.status(500).json(
            {
                message: "Error al interactuar con la Firestore."
            }
        )
    }
}

// Esta getProductById de cuando tenía el array de 
// productos hardcodeado.
// export const getProductById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const product = await products.findById(product => product.id === id);
//         if (!product) {
//             return res.status(404).json({
//                 message: 'Producto no encontrado'
//             });
//         }
//         res.status(200).json({
//             message: 'Detalles del producto',
//             product
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error al obtener el producto',
//             error: error.message
//         });
//     }
// };

// Esta es la que voy a traer -luego- desde la capa de servicios.
export const getFilteredProducts = (req, res) => {
    const filteredProducts = Service.getFilteredProducts();
    res.status(200).json({
        message: 'Lista de productos filtrados',
        products: filteredProducts
    });
};
