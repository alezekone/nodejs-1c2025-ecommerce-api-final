// Firestore es una BD NoSQL basada en documentos de Firebase.
// Colecciones: agrupan documentos relacionados.
// Documentos: contienen pares clave-valor.
// Soporta estructuras complejas como arrays y maps.

// Acá tendrá lugar la integración con Firebase.
import { db } from './firebase.js';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
// Traeré datos de la colección "products".
const productsCollection = collection(db, 'products');

export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        const products = snapshot.docs.map(doc => 
            ({ 
                id: doc.id,
                 ...doc.data()
            }));
        return products;
    } catch (error) {
        console.error('Error al obtener los productos desde Firebase/Firestore:', error);
        // throw new Error('No se pudieron obtener los productos');
    }
};

export const getProductById = async (id) => {
    try {
        const docRef = doc(productsCollection, id);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
            return null;
        }
        return {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };
    } catch (error) {
        console.error('Error al obtener el producto desde Firebase/Firestore:', error);
        throw new Error('No se pudo obtener el producto');
    }
};



// Versión inicial del modelo de datos para productos.
// Luego reemplazaré por una conexión a Firestore.
// Pero de momento, uso algo más hardcodeado...

// const products = [
//   { id: 1, name: 'Producto 1', price: 1000 },
//   { id: 2, name: 'Producto 2', price: 2000 },
//   { id: 3, name: 'Producto 3', price: 3000 }
// ];

// export const getAllProducts = () => {
//     return products;
// }

