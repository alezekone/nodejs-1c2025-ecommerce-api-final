// Firestore es una BD NoSQL basada en documentos de Firebase.
// Colecciones: agrupan documentos relacionados.
// Documentos: contienen pares clave-valor.
// Soporta estructuras complejas como arrays y maps.

// Acá tendrá lugar la integración con Firebase.
import { db } from './firebase.js';
import { 
    collection, /* Para acceder a una colección */
    getDocs, /* Para obtener todos los documentos */
    doc,     /* Para obtener un documento específico */
    getDoc,  /* Para obtener un documento específico */
    addDoc,  /* Para agregar un nuevo documento */
    setDoc,  /* Para actualizar un documento existente */
    deleteDoc  /* Para eliminar un documento */
} from 'firebase/firestore';

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

export const createProduct = async (newProductData) => {
    try {
        const docRef = await addDoc(productsCollection, newProductData);
        return { 
            id: docRef.id,
             ...newProductData
            };
    } catch (error) {
        console.error('Error al crear el producto en Firebase/Firestore:', error);
        throw new Error('No se pudo crear el producto');
    }
};

export const updateProduct = async (id, updatedProductData) => {
    try {
        // Obtengo el documento a modificar/pisar.
        const docRef = doc(productsCollection, id);
        // Existe 'setDoc' y 'updateDoc', pero este último es a veces
        // problemático. Mejor usar setDoc, el cual se comporta como 
        // como PUT o como PATCH dependiendo de su propiedad 'merge'.
        // Si merge está en false (o no está), reemplaza todo el documento (PUT).
        // Si merge está en true, solo actualiza los campos que se pasen (PATCH).
        await setDoc(docRef, updatedProductData, {merge: true});
        return {
            id,
            ...updatedProductData
        };
    } catch (error) {
        console.error('Error al intentar hacer un update del producto');
        throw new Error('Error al intentar hacer un update del producto');
    }
}

export const replaceProduct = async (id, updatedProductData) => {
    try {
        // Obtengo el documento a modificar/pisar.
        const docRef = doc(productsCollection, id);
        // Existe 'setDoc' y 'updateDoc', pero este último es a veces
        // problemático. Mejor usar setDoc, el cual se comporta como 
        // como PUT o como PATCH dependiendo de su propiedad 'merge'.
        // Si merge está en false (o no está), reemplaza todo el documento (PUT).
        // Si merge está en true, solo actualiza los campos que se pasen (PATCH).
        await setDoc(docRef, updatedProductData, {merge: false});
        return {
            id,
            ...updatedProductData
        };
    } catch (error) {
        console.error('Error al intentar hacer un update del producto');
        throw new Error('Error al intentar hacer un update del producto');
    }
}

export const deleteProduct = async (id) => {
    try {
        const docRef = doc(productsCollection, id);
        await deleteDoc(docRef);
        // return { message: 'Producto eliminado exitosamente' };
        return true;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        // throw new Error('No se pudo eliminar el producto');
        return false;
    }
}

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

