// Acá tendrá lugar la integración con Firebase.
// Pero de momento, uso algo más hardcodeado...
const products = [
  { id: 1, name: 'Producto 1', price: 1000 },
  { id: 2, name: 'Producto 2', price: 2000 },
  { id: 3, name: 'Producto 3', price: 3000 }
];

export const getAllProducts = () => {
    return products;
}

